import { Injectable } from '@angular/core';
import { UserFromFirebase } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class Check24hoursService {

  constructor() { }

  pass24hoursCheck(user: UserFromFirebase) {
    if (user) {
      const lastLogin = parseInt(user.metadata.b)
      const day = 1000 * 60 * 60 * 24;
      const difference = Date.now() - lastLogin;
      return (difference > day) ? false : true;
    } else {
      return false;
    }
  }


  passIntervalCheck(user: UserFromFirebase, interval: number) {
    if (user) {
      const lastLogin = parseInt(user.metadata.b)
      const difference = Date.now() - lastLogin;
      return (difference > interval) ? false : true;
    } else {
      return false;
    }
  }
}
