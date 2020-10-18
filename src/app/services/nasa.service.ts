import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { forkJoin, observable, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NasaService {
  nasaUrl = "https://api.nasa.gov/planetary/apod";
  apiKey = 'Lr2qmiNCO7Z8yALaasujJNg65LKGFAGgTXGhOfYe';
  day = 1000*60*60*24;

  constructor(private http: HttpClient, private datepipe: DatePipe) { }

  getImages(dates:{from: number, to: number}): Observable<any[]> {
    let {nasaUrl, apiKey} = this;
    let {from, to} = dates;
    let msArr: Array<number> = [from];
    let datesArr: Array<string> = [];
    let requestsArr: Array<Observable<any>> = []

    for (let i = 0; msArr[i] < to; i++) {
      msArr.push(msArr[i] + this.day);
    }

    for (let i = 0; i < msArr.length; i++) {
      datesArr[i] = this.datepipe.transform(msArr[i], "yyyy-MM-dd")
    }

    for (let i = 0; i < datesArr.length; i++) {
      requestsArr[i] = this.http.get(`${nasaUrl}?api_key=${apiKey}&date=${datesArr[i]}`)
    }

    return forkJoin(requestsArr);
  }
}
