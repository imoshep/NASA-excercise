import { Component, OnInit } from '@angular/core';
import { ParsedDates } from 'src/app/interfaces/parsed-dates';

@Component({
  selector: 'app-nasa',
  templateUrl: './nasa.component.html',
  styleUrls: ['./nasa.component.scss']
})
export class NasaComponent implements OnInit {
  dateRangeFromSearchBox: ParsedDates;
  constructor() { }

  submitRangeToResults(range): void {
    this.dateRangeFromSearchBox = range;
  }

  ngOnInit(): void {
  }

}
