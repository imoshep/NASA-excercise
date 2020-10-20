import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  constructor(private db: AngularFireDatabase) { }

  // dbRef = this.db.list('users/' +)
  // searchesRef = this.db.list('search-history');
}
