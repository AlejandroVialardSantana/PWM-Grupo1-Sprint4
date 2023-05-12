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

  @Output() onSearch: EventEmitter<any> = new EventEmitter();

  actualSearchText:string = "";
  filteredSuggestions: string[] = [];

  constructor(private elementRef: ElementRef) { }

  onSubmit():void {
    this.onSearch.emit( { type: 'search', value: this.actualSearchText } );
  }

}