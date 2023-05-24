import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Actividad } from '../../models/actividades';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { PageEvent } from '@angular/material/paginator';
import { Subscription } from 'rxjs';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';

@Component({
  selector: 'app-my-activity-list',
  templateUrl: './my-activity-list.component.html',
  styleUrls: ['./my-activity-list.component.scss'],
})
export class MyActivityListComponent implements OnInit {

  activities: Actividad[] = [];
  user$ = this.userService.currentUserProfile$;
  subscription: Subscription = new Subscription();
  db: SQLiteObject = {} as SQLiteObject;
  userEmail: string | null = '';

  // Paginator Inputs
  pageSize = 5;
  pageSizeOptions: number[] = [5];
  paginatedActivities: Actividad[] = [];
  pageIndex = 0;
  startIndex = 0;

  constructor(private userService: UserService, private sanitizer: DomSanitizer, private sqlite: SQLite) { 
    this.userEmail = localStorage.getItem('thisUserMail');
  }

  ngOnInit(): void {
    this.sqlite.create({
      name: 'data.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      this.db = db;
      this.db.executeSql('SELECT * FROM favoritos where uniqueEmail = ?', [this.userEmail])
      .then(res => {
        for (let i = 0; i < res.rows.length; i++) {
          const datosDB = res.rows.item(i);
          const actividad: Actividad = this.asignarValoresActividad(datosDB);
          this.activities.push(actividad);
        }
        this.paginateActivities();
      });
    });
  }

  sanitizeUrl(url: string): SafeUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  paginateActivities(event?: PageEvent): void {
    this.pageIndex = event ? event.pageIndex : 0;
    this.startIndex = this.pageIndex * this.pageSize;
    this.paginatedActivities = this.activities.slice(this.startIndex, this.startIndex + this.pageSize);
  }

  removeActivity(index: number): void {
    const confirmation = confirm('¿Está seguro de que desea eliminar esta actividad?');
    if (confirmation) {
      const activityIndex = this.startIndex + index;
      if (this.userEmail) {
        this.db.executeSql('DELETE FROM favoritos WHERE uniqueEmail = ? AND name = ?', [this.userEmail, this.activities[activityIndex].name])
        .then(res => {
          console.log(res);
        });
      }
      this.activities.splice(activityIndex, 1);
      this.paginateActivities();
    }
  }

  asignarValoresActividad(datosDB: any): Actividad {
    const actividad: Actividad = {
      name: datosDB.name,
      description: '', // Valor por defecto
      image: datosDB.image,
      location: datosDB.location,
      city: '', // Valor por defecto
      location_map: datosDB.location_map,
      category: [], // Valor por defecto
      user_reviews: [], // Valor por defecto
      duration: 0, // Valor por defecto
      price: 0, // Valor por defecto
      specificNeeds: [], // Valor por defecto
      stars: 0, // Valor por defecto
      stars_array: [] // Valor por defecto
    };
  
    return actividad;
  }
}
