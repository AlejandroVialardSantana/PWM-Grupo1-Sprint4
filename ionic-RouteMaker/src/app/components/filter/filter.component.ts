import { Component, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})

export class FilterComponent {
  @Output() filterChange = new EventEmitter<any>();

  duration = 8;
  maxCost = 50;
  activityTypes = [
    {value: '1', viewValue: 'Aire libre', checked: false},
    {value: '2', viewValue: 'Arquitectura', checked: false},
    {value: '3', viewValue: 'Cultura', checked: false},
    {value: '4', viewValue: 'Naturaleza', checked: false},
    {value: '5', viewValue: 'Playa', checked: false},
    {value: '6', viewValue: 'Sendero', checked: false},
    {value: '7', viewValue: 'Ciencias', checked: false}
  ];
  specificNeeds = [
    {value: '1', viewValue: 'Apto para niños', checked: false},
    {value: '2', viewValue: 'Apto para mascotas', checked: false},
    {value: '3', viewValue: 'Apto para minusválidos', checked: false}
  ];

  
  // Funciones para emitir eventos cuando cambia un valor
  onDurationChange() {
    this.filterChange.emit({ type: 'duration', value: this.duration });
  }

  onMaxCostChange() {
    this.filterChange.emit({ type: 'maxCost', value: this.maxCost });
  }

  onActivityTypeChange(type: {value: string, viewValue: string, checked: boolean}) {
    this.filterChange.emit({ type: 'activityType', value: type.viewValue, isActive: type.checked ? 1 : 0 });
  }
  
  onSpecificNeedChange(need: {value: string, viewValue: string, checked: boolean}) {
    this.filterChange.emit({ type: 'specificNeed', value: need.viewValue, isActive: need.checked ? 1 : 0 });
  }

}

