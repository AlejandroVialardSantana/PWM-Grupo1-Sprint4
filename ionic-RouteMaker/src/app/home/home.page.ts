import { Component } from '@angular/core';
import { FirestoreService } from '../services/firestore.service';
import { Destino } from '../models/destinos';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  destinies: Destino[] = [];

  constructor(private firestore: FirestoreService) {}

  ngOnInit() {
    this.firestore.getDestinies().subscribe((destinies) => {
      this.destinies = destinies;
    });
  }

}
