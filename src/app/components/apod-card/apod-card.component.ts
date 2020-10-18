import { Component, Input, OnInit } from '@angular/core';
import { Apod } from 'src/app/interfaces/apod';

@Component({
  selector: 'app-apod-card',
  templateUrl: './apod-card.component.html',
  styleUrls: ['./apod-card.component.scss']
})
export class ApodCardComponent implements OnInit {
  @Input() apod: Apod;

  constructor() { }

  ngOnInit(): void {

  }

}
