import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ElementRef } from '@angular/core';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.scss']
})
export class SearchbarComponent {

  @Input() barTitle:string = "¿Cuál es tu destino?";
  @Input() barPlaceHolder:string = "Escribe tu destino...";
  @Input() suggestions: string[] = [];
  @Input() numOfSuggestion: number = 3;

  @Output() onSearch: EventEmitter<any> = new EventEmitter();

  actualSearchText:string = "";
  filteredSuggestions: string[] = [];

  constructor(private elementRef: ElementRef) { }

  onSubmit():void {
    this.onSearch.emit( { type: 'search', value: this.actualSearchText } );
  }

  filterSuggestions(): void {
    const lastWord = this.actualSearchText.split(" ").pop();
    if (typeof lastWord === "string"){
      this.filteredSuggestions = this.suggestions.filter(suggestion => suggestion.startsWith(lastWord));
    }
    this.onSubmit();
  }

  onSuggestionClick(suggestion: string): void {
    const words = this.actualSearchText.split(" ");
    words.pop();
    words.push(suggestion);
    this.actualSearchText = words.join(" ");
    this.filteredSuggestions = [];
    this.onSubmit();
  }
/*
  searchBarLostFocus(): void{
    setTimeout(() => {
      this.filteredSuggestions = [];
    }, 150);
  }
  */

  onClickOutside(event: MouseEvent): void {
    const suggestionList = this.elementRef.nativeElement.querySelector('.suggestion-list');
    if (!this.elementRef.nativeElement.contains(event.target) || (suggestionList && !suggestionList.contains(event.target as HTMLElement))) {
      this.filteredSuggestions = [];
    }
  }

}


/* 
Si lo queremos hacer con elementos nativos de HTML
  
import { Component, ViewChild, ElementRef } from '@angular/core';

export class MyComponent {
  @ViewChild('myInput') myInput: ElementRef;

  onSubmit(value: string) {
    // Hacer algo con el valor obtenido
    console.log(value);

    // Resetear el valor del input
    this.myInput.nativeElement.value = '';
    this.myInput.nativeElement.focus();
  }
}
*/