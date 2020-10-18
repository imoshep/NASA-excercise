import { Component, OnInit } from '@angular/core';
import { DatesNums } from 'src/app/interfaces/numbered-dates';

@Component({
  selector: 'app-nasa',
  templateUrl: './nasa.component.html',
  styleUrls: ['./nasa.component.scss']
})
export class NasaComponent implements OnInit {
  dateRangeFromSearchBox: DatesNums;
  constructor() { }

  submitRangeToResults(range): void {
    this.dateRangeFromSearchBox = range;
  }

  ngOnInit(): void {
  }

}
