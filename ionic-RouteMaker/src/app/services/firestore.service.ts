import { Injectable } from '@angular/core';
import { Firestore, collectionData, collection, doc, setDoc, docData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Destino } from '../models/destinos';
import { Actividad } from '../models/actividades';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(private firestore: Firestore) { }

  getDestinies(): Observable<Destino[]> {
    const destiniesRef = collection(this.firestore, 'destinos');
    return collectionData(destiniesRef, { idField: 'id' }) as Observable<Destino[]>;
  }

  getActivities(): Observable<Actividad[]> {
    const activitiesRef = collection(this.firestore, 'actividades');
    return collectionData(activitiesRef, { idField: 'id' }) as Observable<Actividad[]>;
  }

  getActivityByID(id: any) {
    const activityRef = doc(this.firestore, `actividades/${id}`);
    return docData(activityRef, { idField: 'id' }) as Observable<Actividad>;
  }
}