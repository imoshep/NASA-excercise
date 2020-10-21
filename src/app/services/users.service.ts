import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from '@angular/fire/storage';
import { UploadTaskSnapshot } from '@angular/fire/storage/interfaces';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  constructor(private db: AngularFireDatabase, private storage: AngularFireStorage) { }

  //  AngularFireUploadTask
  // {task, ref}
  // {uploadPercentObs, snapChangObs, ref}
  uploadImage(uid: string, file: File): {task: AngularFireUploadTask, fileRef: AngularFireStorageReference}{
      if (file && uid) {
        console.log('uploadimage from service');

        const storageRef = this.storage.ref(`user-profile-images/${uid}`);
        const task = storageRef.put(file);

        return {task: task , fileRef: storageRef}
    } else {
      return null
    }
  }

  // uploadImage(uid: string, file: File): {uploadPercent: Observable<number>, snapshotChanges: Observable<UploadTaskSnapshot>, fileRef: AngularFireStorageReference}{
  //     if (file && uid) {
  //       console.log('uploadimage from service');

  //       const storageRef = this.storage.ref(`user-profile-images/${uid}`);
  //       const task = storageRef.put(file);

  //       return {uploadPercent: task.percentageChanges(), snapshotChanges: task.snapshotChanges(), fileRef: storageRef}

  //   } else {
  //     return null
  //   }
  // }

  updateProfile(user: User) {
    if (user) {
      const dbRef = this.db.object(`users/${user.uid}`);
      return dbRef.set(user);
    } else {
      return null;
    }
  }

  getUserData(uid: string) {
    if (uid) {
      const dbRef = this.db.object(`users/${uid}`);
      return dbRef.valueChanges()
    } else {
      return null;
    }
  }

  // dbRef = this.db.list('users/' +)
  // searchesRef = this.db.list('search-history');
}
