import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(3)])
  })

  errors = {
    email: '',
    password: ''
  }

  constructor(private auth: AuthService, private router: Router) { }

  onSubmit() {
    let {email, password} = this.auth.mockLogin(this.loginForm.value)
    if (!email) this.errors.email = 'Email Not Found'
    else if (!password) {this.errors.email =''; this.errors.password = 'Wrong Password'}
    if (this.auth.isLoggedIn) this.router.navigateByUrl('')
  }

  ngOnInit(): void {
  }

  get email() { return this.loginForm.get('email'); }

  get password() { return this.loginForm.get('password'); }
}
// /return ;
