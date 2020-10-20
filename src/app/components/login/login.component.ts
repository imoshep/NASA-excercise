import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  public loginStatus: Subscription;
  public loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });
  public loginError = ''

  constructor(private auth: AuthService,  private router: Router) {}

  async onSubmit() {
    const { email, password } = this.loginForm.value;
    try {
      if (!this.loginForm.valid) throw new Error('Invalid sign-in credentials');
      await this.auth.login(email, password);
      this.router.navigateByUrl('apod')
    } catch (error) {
      this.loginError = error.message;
    }
  }

  loginProviders(provider: 'Google' | 'Facebook') {
    try{
      switch (provider) {
        case 'Google':
          this.auth.loginWithGoogle();
          break;
        case 'Facebook':
          this.auth.loginWithFacebook();
          break;
        default:
          break;
      }
    } catch (error) {
      this.loginError = error.message;
    }
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    if (this.loginStatus) this.loginStatus.unsubscribe();
  }

  get email() { return this.loginForm.get('email'); }
  get password() { return this.loginForm.get('password'); }
}
