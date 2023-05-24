import { Component, OnInit, Input } from '@angular/core';
import { Actividad } from '../../models/actividades';
import { FirestoreService } from 'src/app/services/firestore.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { ActivatedRoute } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';

@Component({
  selector: 'app-activity-info',
  templateUrl: './activity-info.component.html',
  styleUrls: ['./activity-info.component.scss'],
})
export class ActivityInfoComponent implements OnInit {
  disableButton = true;

  @Input() actividad: Actividad = {} as Actividad;
  activityName: string | null = '';
  isFavorite: boolean = false;
  db: SQLiteObject = {} as SQLiteObject;
  userEmail: string | null = '';

  constructor(private toast: HotToastService, private sanitizer: DomSanitizer, private sqlite: SQLite, private route: ActivatedRoute) {
    this.userEmail = localStorage.getItem('thisUserMail');
    //this.userEmail = "prueba@example.com";
    this.activityName = this.route.snapshot.paramMap.get('name');
  }

  ngOnInit() {
    this.sqlite.create({
      name: 'data.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      this.db = db;
      this.checkFavorite();
    });

    if(this.userEmail != ""){
      this.disableButton=false;
    }
  }

  sanitizeUrl(url: string): SafeUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  checkFavorite() {
    this.db.executeSql('SELECT * FROM favoritos WHERE name = ? AND uniqueEmail = ?', [this.activityName, this.userEmail])
      .then(res => {
        this.isFavorite = res.rows.length > 0;
      });
  }

  toggleFavorite() {
    const favIcon = document.getElementById('fav_icon');
    if (this.isFavorite) {
      this.db.executeSql('DELETE FROM favoritos WHERE name = ? AND uniqueEmail = ?', [this.activityName, this.userEmail])
        .then(res => {
          this.toast.success("Actividad eliminada de 'Mis Actividades'")
          this.isFavorite = false;
          favIcon?.classList.remove('bi-heart-fill');
          favIcon?.classList.add('bi-heart');
        })
    } else {
      this.db.executeSql('INSERT INTO favoritos (name, image, location, location_map, uniqueEmail) VALUES (?, ?, ?, ?, ?)', [this.actividad.name, this.actividad.image, this.actividad.location, this.actividad.location_map, this.userEmail])
        .then(res => {
          this.toast.success("Actividad guardada en 'Mis Actividades'")
          this.isFavorite = true;
          favIcon?.classList.remove('bi-heart');
          favIcon?.classList.add('bi-heart-fill');
        })
    }
  }

  checkUser() {
    
  }

}