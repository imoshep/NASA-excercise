import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public loginStatus: Observable<any>;
  redirectUrl: string;

  constructor(private auth: AngularFireAuth) {
    this.loginStatus = new Observable((subscriber) => {
      this.auth.onAuthStateChanged(subscriber);
    })
  }

  async register(email: string, password: string) {
    try {
      if (!email || !password) throw new Error('Invalid email and/or password');
      await this.auth.createUserWithEmailAndPassword(email, password);
      return true;
    } catch (error) {
      console.error('sign in failed', error)
      return false
    }
  }


  async login(email: string, password: string) {
    try {
      if (!email || !password) throw new Error('Invalid email and/or password');
      await this.auth.signInWithEmailAndPassword(email, password);
      return true;
    } catch (error) {
      console.error('sign in failed', error)
      return false
    }
  }


  async logout() {
    console.log('logout from services');

    try {
      await this.auth.signOut();
      console.log('signed out!');

      return true;
    } catch (error) {
      console.log('Sign out failed', error);
      return false;
    }
}
}
