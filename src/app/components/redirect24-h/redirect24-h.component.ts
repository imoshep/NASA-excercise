import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-redirect24-h',
  templateUrl: './redirect24-h.component.html',
  styleUrls: ['./redirect24-h.component.scss']
})
export class Redirect24HComponent implements OnInit {

  constructor(private auth: AuthService, private router: Router) {
    console.log('redirect 24H comp');

    this.auth.logout().then((res) => {
      console.log(res)
      this.router.navigateByUrl('login')
    });
  }

  ngOnInit(): void {
  }

}
