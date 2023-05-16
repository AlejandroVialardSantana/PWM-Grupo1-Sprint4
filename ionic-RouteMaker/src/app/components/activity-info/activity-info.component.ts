import { Component, OnInit, Input } from '@angular/core';
import { Actividad } from '../../models/actividades';
import { FirestoreService } from 'src/app/services/firestore.service';
import { DomSanitizer, SafeUrl  } from '@angular/platform-browser';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';

@Component({
  selector: 'app-activity-info',
  templateUrl: './activity-info.component.html',
  styleUrls: ['./activity-info.component.scss'],
})
export class ActivityInfoComponent  implements OnInit {

  @Input() actividad: Actividad = {} as Actividad;
  isFavorite: boolean = false;
  db: SQLiteObject = {} as SQLiteObject;
  userEmail: string | null = '';

  constructor(private firestore: FirestoreService, private sanitizer: DomSanitizer, private sqlite: SQLite) { 
    //this.userEmail = localStorage.getItem('thisUserMail');
    this.userEmail = "prueba@example.com";
  }

  ngOnInit() {
    alert("Empezamos");
    this.sqlite.create({
      name: 'data.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      this.db = db;
      this.checkFavorite();
    });
  }

  sanitizeUrl(url: string): SafeUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  checkFavorite() {
    alert("Checkeamos el favorito, activityname: " + this.actividad.name + " y email: " + this.userEmail);
    this.db.executeSql('SELECT * FROM favoritos WHERE name = ? AND uniqueEmail = ?', [this.actividad.name, this.userEmail])
      .then(res => {
        this.isFavorite = res.rows.length > 0;
        alert("Obtenemos: " + this.isFavorite);
      });
  }

  toggleFavorite() {
    if (this.isFavorite) {
      this.db.executeSql('DELETE FROM favoritos WHERE name = ? AND uniqueEmail = ?', [this.actividad.name, this.userEmail])
        .then(res => {
          this.isFavorite = false;
        })
    } else {
      this.db.executeSql('INSERT INTO favoritos (name, image, location, location_map, uniqueEmail) VALUES (?, ?, ?, ?, ?)', [this.actividad.name, this.actividad.image, this.actividad.location, this.actividad.location_map, this.userEmail])
        .then(res => {
          this.isFavorite = true;
        })
    }
  }

}