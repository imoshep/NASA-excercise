import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastService } from 'angular-toastify';
import { DatesNums } from 'src/app/interfaces/numbered-dates';
import { UserFromFirebase } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';
import { Check24hoursService } from 'src/app/services/check24hours.service';

@Component({
  selector: 'app-nasa',
  templateUrl: './nasa.component.html',
  styleUrls: ['./nasa.component.scss']
})
export class NasaComponent implements OnInit {
  dateRangeFromSearchBox: DatesNums;
  constructor(private auth: AuthService, private intervalCheck: Check24hoursService, private router: Router, private toast: ToastService) { }

  submitRangeToResults(range: DatesNums): void {
    this.dateRangeFromSearchBox = range;
  }

  ngOnInit(): void {
      this.auth.loginStatus.subscribe(async (user: UserFromFirebase) => {
      if (!this.intervalCheck.pass24hoursCheck(user)) {
        this.toast.info('Please sign in')
        await this.auth.logout();
        this.router.navigateByUrl('login');
      }
    })
  }

}
