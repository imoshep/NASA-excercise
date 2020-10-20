import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable, of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public loginStatus: Observable<any>;
  redirectUrl: string;

  constructor(private afa: AngularFireAuth) {
    this.loginStatus = new Observable((subscriber) => {
      this.afa.onAuthStateChanged(subscriber);
    })
  }

  getCurrentUser() {
    return this.afa.user;
  }

  async register(email: string, password: string) {
    return this.afa.createUserWithEmailAndPassword(email, password);
  }

  loginWithFacebook() {
    return this.afa.signInWithPopup(new firebase.auth.FacebookAuthProvider());
  }

  loginWithGoogle() {
    return this.afa.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  async login(email: string, password: string) {
    try {
      if (!email || !password) throw new Error('Invalid email and/or password');
      await this.afa.signInWithEmailAndPassword(email, password);
      return true;
    } catch (error) {
      // console.error('sign in failed', error)
      return false
    }
  }


  async logout() {
    try {
      // await firebase.auth().signOut();
      await this.afa.signOut();
      return true;
    } catch (error) {
      console.log('Sign out failed', error);
      return false;
    }
}
}
