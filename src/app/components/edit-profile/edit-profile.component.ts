import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UploadTaskSnapshot } from '@angular/fire/storage/interfaces';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastService } from 'angular-toastify';
import { Observable, Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { User, UserFromFirebase } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';
import { ilIDValidator } from 'src/app/services/form-validation.directive';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {
  @ViewChild("fileInput", {static: false}) fileInput: ElementRef;
  public user: any | User = {};
  public profileError = '';
  public editUserForm: FormGroup;
  public uploadPercent: number;
  public downloadURL: string;
  public imageFile: File;
  public whatreturns: any;

  get photoUrl() { return this.editUserForm.get('photoUrl') }

  constructor(
    private auth: AuthService,
    private usersService: UsersService,
    private router: Router,
    private toast: ToastService
  ) {}


  async onSubmit() {
    try {
      if (!this.editUserForm.valid) throw new Error('Invalid details');
      if (!this.imageFile) throw new Error('Please upload a profile image')
      const {task, fileRef} = this.usersService.uploadImage(this.user.uid, this.imageFile);
      task.percentageChanges().subscribe((p) => this.uploadPercent = p)
      task.snapshotChanges().subscribe({
        error: (e) => {throw new Error(e)},
        complete: () => {
          fileRef.getDownloadURL().subscribe(async (urlFromStorage) => {
            this.editUserForm.controls.photoUrl.setValue(urlFromStorage);
            this.editUserForm.value.birthDate = this.editUserForm.value.birthDate.getTime();
            let user: User = {...this.editUserForm.value, uid: this.user.uid, email: this.user.email}
            await this.usersService.updateProfile(user)
            this.router.navigateByUrl('apod')
          })
        }
      })
    } catch (error) {
      this.profileError = error.message;
    }
  };

  saveFile(file: File) {
    if(!file.type.startsWith('image/')) {
      this.toast.info('Only image files are allowed ')
    } else {
      console.log('saving file');

    this.imageFile = file;
    }
  }

  ngOnInit(): void {
    this.auth.getCurrentUser().subscribe((userFromFirebase: UserFromFirebase) => {
      this.user.uid = userFromFirebase.uid;
      this.user.email = userFromFirebase.email;
      this.usersService.getUserData(userFromFirebase.uid).subscribe((userData: User) => {
        if (userData) {
        this.user = userData;
        this.editUserForm = new FormGroup({
          firstName: new FormControl(userData.firstName, Validators.required),
          lastName: new FormControl(userData.lastName, Validators.required),
          email: new FormControl(userData.email, Validators.required),
          address: new FormControl(userData.address, Validators.required),
          ilID: new FormControl(userData.ilID, [Validators.required, ilIDValidator]),
          birthDate: new FormControl(userData.birthDate, Validators.required), // how to input date to picker
          phone: new FormControl(userData.phone, [Validators.required, Validators.pattern(/(^0[2-4]|[8-9]\d{7}$)|(^05\d{8}$)/)]),
          photoUrl: new FormControl(this.user.photoUrl)
        })} else {
          this.editUserForm = new FormGroup({
            firstName: new FormControl('', Validators.required),
            lastName: new FormControl('', Validators.required),
            email: new FormControl(userFromFirebase.email, Validators.required),
            address: new FormControl('', Validators.required),
            ilID: new FormControl('', [Validators.required, ilIDValidator]),
            birthDate: new FormControl('', Validators.required),
            phone: new FormControl('', [Validators.required, Validators.pattern(/(^0[2-4]|[8-9]\d{7}$)|(^05\d{8}$)/)]),
            photoUrl: new FormControl(this.user.photoUrl)
          })
        }
      })
    })
  }

}
