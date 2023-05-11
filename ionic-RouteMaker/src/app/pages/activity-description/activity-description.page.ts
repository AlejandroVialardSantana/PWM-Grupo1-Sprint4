import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FirestoreService } from '../../services/firestore.service';
import { Actividad } from '../../models/actividades';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-activity-description',
  templateUrl: './activity-description.page.html',
  styleUrls: ['./activity-description.page.scss'],
})
export class ActivityDescriptionPage implements OnInit, OnDestroy {

  actividad: Actividad = {} as Actividad;
  private subscription: Subscription = new Subscription();

  constructor(private route: ActivatedRoute, private firestore: FirestoreService) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');

    this.subscription = this.firestore.getActivityByID(id).subscribe(activity => {
      this.actividad = activity;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
