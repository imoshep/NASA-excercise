import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn = false;
  redirectUrl: string;

  registeredUsers = [ { email: 'test@moveo.group', password: '123'}]

  login(email, password) {

  }

  mockLogin(userData:{email: string, password: string}): any {
    let valid = {email: false, password: false};
    for(let user of this.registeredUsers) {
      if (user.email === userData.email) {
        valid.email = true;
        if (user.password === userData.password) {
          valid.password = true;
          break;
        }
      }
    }

    if (valid.email && valid.password) this.isLoggedIn = true;
    return valid;
  }

  logout(): void {
    this.isLoggedIn = false;
  }
}
