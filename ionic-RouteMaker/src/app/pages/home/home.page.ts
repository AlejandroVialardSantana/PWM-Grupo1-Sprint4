import { Component, OnInit } from '@angular/core';
import { Actividad } from 'src/app/models/actividades';
import { FirestoreService } from 'src/app/services/firestore.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
  private paramSubscription: Subscription = new Subscription();

  allActivities: Actividad[] = [];
  filteredActivities: Actividad[] = [];

  checkBoxFilters:string[] = [];
  durationFilter:number = 8;
  maxCostFilter:number = 50;
  searchBarText:string = '';

  filterByParam: string = "";

  constructor(private firestoreService: FirestoreService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.firestoreService.getActivities().subscribe((activitiesData: Actividad[]) => {
      this.allActivities = activitiesData;
      this.filteredActivities = activitiesData;

      //Establecemos los valores que se utilizaran para sugerir texto
      this.onFilterChange({type: 'none', value: ''});
    });

    this.paramSubscription = this.route.paramMap.subscribe(params => {
      const activityName = params.get('destinityName');

      if (typeof activityName === 'string') {
        this.onFilterChange({type: 'param', value: activityName});
      }

    });

  }

  ngOnDestroy(): void{
    this.paramSubscription.unsubscribe();
  }

  // Elimina palabras no deseadas y normaliza la cadena de texto, las devuelve cada una en un array
  removeUnwantedWordsInArray(input: string): string[] {
    const unwantedWords = ['de', 'las', 'en', 'la', 'el', 'los', 'del'];
    const words = input.toLowerCase().split(' ');
    const filteredWords = words.filter(word => !unwantedWords.includes(word));
    return filteredWords;
  }

  // Elimina palabras no deseadas y normaliza la cadena de texto, , las devuelve todas juntas en un string
  removeUnwantedWords(input: string): string {
    const filteredWords = this.removeUnwantedWordsInArray(input);
    return filteredWords.join(' ');
  }

  //Para poder comparar las categorías sin problema, por ej "Cultura" y "cultura" son iguales
  normalizeString(input: string): string {
    return input
      .toLowerCase()
      .normalize('NFD') // Esto descompone los acentos de las letras
      .replace(/[\u0300-\u036f]/g, '') // Esto elimina los acentos
      .replace(/\s/g, ''); // Esto elimina los espacios
  }

  onFilterChange(event: any) {

    // Restablecemos filteredActivities a allActivities antes de aplicar los filtros
    this.filteredActivities = [...this.allActivities];
  
    //Si el evento es un cambio en el texto de búsqueda
    if(event.type == 'search'){
      // Actualizamos el valor del filtro de texto de búsqueda
      this.searchBarText = event.value;
    }
    // Si el evento que recibimos es de un checkbox
    else if(event.type == 'activityType' || event.type == 'specificNeed'){
      // Si el checkbox está activo
      if(event.isActive){
        // Añadimos el filtro a la lista de filtros
        this.checkBoxFilters.push(this.normalizeString(event.value));
      }
      // Si el checkbox está desactivado
      else{
        // Eliminamos el filtro de la lista de filtros
        this.checkBoxFilters.splice(this.checkBoxFilters.indexOf(this.normalizeString(event.value)),1);
      }
    }
    // Si el evento es un filtro por parámetro
    else if(event.type == 'param'){
      // Actualizamos el valor del filtro por parámetro
      this.filterByParam = event.value;
    }

    // Si el evento que recibimos es de un slider
    else if(event.type != 'none'){
      // Si el evento es de duración
      if(event.type == 'duration'){
        // Actualizamos el valor del filtro de duración
        this.durationFilter = event.value;
      }
      // Si el evento es de coste máximo
      else{
        // Actualizamos el valor del filtro de coste máximo
        this.maxCostFilter = event.value;
      }
    }
    
    // Ahora aplicamos todos los filtros
    this.filteredActivities = this.filteredActivities.filter((activity: Actividad) => {

      //Comparamos todo normalizado (sin mayusculas, espacios, acentos... y también eliminando palabras como "de", "las"...)
      if (!this.normalizeString(this.removeUnwantedWords(activity.name)).includes(this.normalizeString(this.removeUnwantedWords(this.searchBarText)))) {
        return false;
      }


      // Si la actividad no pertenece al lugar especificado por parámetro, no pasa el filtro
      if (this.filterByParam.length > 0) {
        if (!this.normalizeString(activity.location).includes(this.normalizeString(this.filterByParam))) {
          return false;
        }
      }

      // Si el coste de la actividad es mayor que el coste máximo del filtro, la actividad no pasa el filtro
      if (activity.price > this.maxCostFilter) {
        return false;
      }
      // Si la duración de la actividad es mayor que la duración del filtro, la actividad no pasa el filtro
      if (activity.duration > this.durationFilter) {
        return false;
      }

      // Si checkbox filters esta vacio, no hay filtros de categorias por ende no hay que filtrar
      if(this.checkBoxFilters.length == 0){
        return true;
      }

      // Recorremos las categorías de cada actividad y vemos si estan en los filtros

      var numberOfFilterShouldPass = this.checkBoxFilters.length;


      //Comprobamos si la actividad tiene categorias o necesidades especificas, puede venir el error del firebase y que no tenga nada
      //Ahora comprobamos si la actividad tiene las categorias o necesidades especificas que se han seleccionado en los filtros
      if(activity.category){
        for (let i = 0; i < this.checkBoxFilters.length; i++) {
          for (let j = 0; j < activity.category.length; j++) {
            if(this.checkBoxFilters[i] == this.normalizeString(activity.category[j])){
              numberOfFilterShouldPass--;
            }
          }
        }
      }

      if(activity.specificNeeds){
        for (let i = 0; i < this.checkBoxFilters.length; i++) {
          for (let j = 0; j < activity.specificNeeds.length; j++) {
            if(this.checkBoxFilters[i] == this.normalizeString(activity.specificNeeds[j])){
              numberOfFilterShouldPass--;
            }
          }
        }
      }

      if(numberOfFilterShouldPass == 0){
        return true;
      }else{
        return false;
      }
    });
  }

}
