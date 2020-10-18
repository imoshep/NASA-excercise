import { DatePipe } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { dateGreaterThenDateValidator, dateInThaPastValidator } from 'src/app/directives/date-validators.directive';
import { DatesNums } from 'src/app/interfaces/numbered-dates';
import { NasaService } from 'src/app/services/nasa.service';


@Component({
  selector: 'app-searchbox',
  templateUrl: './searchbox.component.html',
  styleUrls: ['./searchbox.component.scss']
})
export class SearchboxComponent implements OnInit {
  @Output() dateRangeSubmitted = new EventEmitter<DatesNums>();
  maxDate: Date;

  constructor(private nasaService: NasaService, private datepipe: DatePipe) {
    this.maxDate = new Date()
   }

  apodFromTo = new FormGroup ({
    from: new FormControl('', [Validators.required, dateInThaPastValidator(Date.now())]),
    to: new FormControl('', [Validators.required, dateInThaPastValidator(Date.now())]),
  }, [dateGreaterThenDateValidator])

  setSearchHistory(dates:{from: number, to: number}) {
    let {from, to} = dates;
    let searchHistoryArr: Array<DatesNums> = [];
    let searchHistoryStr: string;

    if (localStorage.getItem('searchHistory')) {
      searchHistoryStr = localStorage.getItem('searchHistory');
      searchHistoryArr = JSON.parse(searchHistoryStr);
      if (searchHistoryArr[4]) searchHistoryArr.shift();
    }

    searchHistoryArr.push({from: from, to: to})

    searchHistoryStr = JSON.stringify(searchHistoryArr);
    localStorage.setItem('searchHistory', searchHistoryStr)
  }

  onSubmit(): void {
    let {from, to} = this.apodFromTo.value

    let dates: DatesNums = {from: null, to: null};
    dates.from = from.getTime();
    dates.to = to.getTime();

    this.setSearchHistory(dates)
    this.dateRangeSubmitted.emit(dates)
  }

  get from() { return this.apodFromTo.get('from'); }
  get to() { return this.apodFromTo.get('to'); }

  ngOnInit(): void {
  }

}
