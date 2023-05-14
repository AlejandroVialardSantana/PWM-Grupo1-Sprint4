import { Injectable } from '@angular/core';
import {Auth, authState, signInWithEmailAndPassword,} from '@angular/fire/auth';
import { createUserWithEmailAndPassword, browserSessionPersistence, setPersistence, } from 'firebase/auth';
import { from, Observable } from 'rxjs';
import { getAuth, updatePassword } from 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  currentUser$ = authState(this.auth);

  constructor(private auth: Auth) {}

  login(email: string, password: string): Observable<any> {
    //Para que no se mantenga iniciada la sesión
    setPersistence(this.auth, browserSessionPersistence).then(() => {
      return signInWithEmailAndPassword(this.auth, email, password);
    });
    return from(signInWithEmailAndPassword(this.auth, email, password));
  }

  signUp(email: string, password: string) {
    //Para que no se mantenga iniciada la sesión
    setPersistence(this.auth, browserSessionPersistence).then(() => {
      return signInWithEmailAndPassword(this.auth, email, password);
    });
    return from(createUserWithEmailAndPassword(this.auth, email, password));
  }
  logout() {
    return from(this.auth.signOut());
  }

  updatePassword(newPassword: string) {
    const auth = getAuth();
    const atuser = auth.currentUser;
    if (atuser) {
      updatePassword(atuser, newPassword);
    }
  }
}
