import { Injectable } from '@angular/core';
import {
  Firestore,
  doc,
  setDoc,
  docData,
  updateDoc,
} from '@angular/fire/firestore';
import { Usuario } from '../models/usuario';
import { from, Observable, switchMap, of } from 'rxjs';
import { AuthenticationService } from './authentication.service';
import { deleteDoc } from 'firebase/firestore';


@Injectable({
  providedIn: 'root',
})
export class UserService {
  get currentUserProfile$(): Observable<Usuario | null> {
    return this.authService.currentUser$.pipe(
      switchMap((user) => {
        if (!user?.uid) {
          return of(null);
        }

        const ref = doc(this.firestore, 'users', user?.uid);
        return docData(ref) as Observable<Usuario>;
      })
    );
  }

  constructor(
    private firestore: Firestore,
    private authService: AuthenticationService
  ) {}

  addUser(user: Usuario): Observable<any> {
    const ref = doc(this.firestore, 'users', user?.uid);
    return from(setDoc(ref, user));
  }

  updateUser(user: Usuario): Observable<void> {
    const ref = doc(this.firestore, 'users', user.uid);
    return from(updateDoc(ref, { ...user }));
  }

  deleteUser(user: Usuario): Observable<any> {
    const ref = doc(this.firestore, `users/${user.uid}`);
    return from(deleteDoc(ref));
  }

  changePassword(user: Usuario): Observable<any> {
    var ref = doc(this.firestore, `users/${user.uid}`);
    return from(updateDoc(ref, { ...user }));
  }
}
