import { Component, OnInit } from '@angular/core';
import { Actividad } from 'src/app/models/actividades';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  activities: Actividad[] = [];

  constructor(private firestore: FirestoreService) {}

  ngOnInit() {
    this.firestore.getActivities().subscribe( res => {
      this.activities = res;
    });
  }
}
