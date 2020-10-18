import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Apod } from 'src/app/interfaces/apod';
import { AuthService } from 'src/app/services/auth.service';
import { NasaService } from 'src/app/services/nasa.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit, OnDestroy {

  public initSubscription: Subscription;
  public imageOfTheDay: Apod;
  public isLoading: boolean;
  public isLoggedIn: boolean;
  public loginSubscription: Subscription;

  constructor(private nasaService: NasaService, private auth: AuthService) { }

  getImage(): Subscription {
    const today = Date.now();
    return this.nasaService.getImages({from: today, to: today}).subscribe(res => this.imageOfTheDay = res[0])
  }

  getBG() {
    return this.imageOfTheDay ? this.imageOfTheDay.url : "https://apod.nasa.gov/apod/image/2010/Arp273Main_HubblePestana_1080.jpg"
  }

  ngOnInit(): void {
    console.log('init');

    this.isLoading = true;
    this.initSubscription = this.getImage();
    this.loginSubscription = this.auth.loginStatus.subscribe((user) => {
      console.log('from subscription');

      this.isLoggedIn = user ? true : false;
      this.isLoading = false;

      console.log(user?.email);
      console.log('isLoading:', this.isLoading);

    })
  }

  ngOnDestroy(): void {
    this.initSubscription && this.initSubscription.unsubscribe();
    this.loginSubscription && this.loginSubscription.unsubscribe();
  }
}
