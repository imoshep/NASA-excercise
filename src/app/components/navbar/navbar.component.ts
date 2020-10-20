import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  public loginStatus: Subscription;
  public userEmail: object;

  constructor(private auth: AuthService, private router: Router) {
    this.loginStatus = this.auth.loginStatus.subscribe((user) => {
      if (user) this.userEmail = user.email;
    })
  }

  async logout() {
    let result = await this.auth.logout();
    result ? this.router.navigate([ 'login' ]) : alert('logout failed')
  }

  ngOnInit(): void {
  }

}
