import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private auth: AuthService, private router: Router) { }

  async logout() {
    console.log('logout runnig');

    let result = await this.auth.logout();
    console.log(result);

    result ? this.router.navigate([ 'login' ]) : alert('logout failed')
  }

  ngOnInit(): void {
  }

}
