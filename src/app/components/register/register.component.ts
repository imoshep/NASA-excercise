import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { repeatPasswordValidator } from 'src/app/directives/registration-validators.directive';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {
  public loginStatus: Subscription;
  public registrationForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    repeatPswd: new FormControl('')
  }, [repeatPasswordValidator])
  public registrationError = '' ;

  constructor(private auth: AuthService, private router: Router) {}

  async onSubmit() {
    const {email, password} = this.registrationForm.value;
    try {
      if (!this.registrationForm.valid) throw new Error('Invalid registration credentials');
      await this.auth.register(email, password);
      this.router.navigateByUrl('apod')
    } catch (error) {
        this.registrationError = error;
    }
  }


  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    if (this.loginStatus) this.loginStatus.unsubscribe();
  }
  get email() { return this.registrationForm.get('email'); }
  get password() { return this.registrationForm.get('password'); }
  get repeatPswd() { return this.registrationForm.get('repeatPswd'); }

}
