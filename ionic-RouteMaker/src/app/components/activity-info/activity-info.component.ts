import { Component, OnInit, Input } from '@angular/core';
import { Actividad } from '../../models/actividades';
import { FirestoreService } from 'src/app/services/firestore.service';
import { DomSanitizer, SafeUrl  } from '@angular/platform-browser';

@Component({
  selector: 'app-activity-info',
  templateUrl: './activity-info.component.html',
  styleUrls: ['./activity-info.component.scss'],
})
export class ActivityInfoComponent  implements OnInit {

  @Input() actividad: Actividad = {} as Actividad;

  constructor(private firestore: FirestoreService, private sanitizer: DomSanitizer) { }

  ngOnInit() {
    
  }

  sanitizeUrl(url: string): SafeUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

}
