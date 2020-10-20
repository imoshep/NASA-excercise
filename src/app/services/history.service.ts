import { Injectable } from '@angular/core';
import { AngularFireDatabase } from "@angular/fire/database";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchHistoryService {
  constructor(private db: AngularFireDatabase) { }

  addSearch(userId: string, time: number, from: number, to: number) {
    if (userId){
      const dbRef = this.db.list(`users/${userId}/history`);
      return dbRef.push({time: time, from: from, to: to});
    } else {
      return null;
    }
  }

  getHistory(userId: string): Observable<any[]> {
    if (userId) {
      const dbRef = this.db.list(`users/${userId}/history`);
      return dbRef.valueChanges()
    } else {
      return null;
    }
  }
}
