import { Injectable } from '@angular/core';
import { Firestore, collectionData, collection, doc, setDoc, docData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Destino } from '../models/destinos';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(private firestore: Firestore) { }

  getDestinies(): Observable<Destino[]> {
    const booksRef = collection(this.firestore, 'destinos');
    return collectionData(booksRef, { idField: 'id' }) as Observable<Destino[]>;
  }
}
