import { DatePipe } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { dateGreaterThenDateValidator, dateInThaPastValidator } from 'src/app/directives/date-validators.directive';
import { DatesNums } from 'src/app/interfaces/numbered-dates';
import { AuthService } from 'src/app/services/auth.service';
import { NasaService } from 'src/app/services/nasa.service';
import { SearchHistoryService } from 'src/app/services/history.service';


@Component({
  selector: 'app-searchbox',
  templateUrl: './searchbox.component.html',
  styleUrls: ['./searchbox.component.scss']
})
export class SearchboxComponent implements OnInit {
  @Output() dateRangeSubmitted = new EventEmitter<DatesNums>();
  maxDate: Date;

  constructor(private nasaService: NasaService, private datepipe: DatePipe, private history: SearchHistoryService, private auth: AuthService) {
    this.maxDate = new Date()
   }

  apodFromTo = new FormGroup ({
    from: new FormControl('', [Validators.required, dateInThaPastValidator(Date.now())]),
    to: new FormControl('', [Validators.required, dateInThaPastValidator(Date.now())]),
  }, [dateGreaterThenDateValidator])

  // setSearchHistoryToLocalStorage(dates:{from: number, to: number}) {
  //   let {from, to} = dates;
  //   let searchHistoryArr: Array<DatesNums> = [];
  //   let searchHistoryStr: string;

  //   if (localStorage.getItem('searchHistory')) {
  //     searchHistoryStr = localStorage.getItem('searchHistory');
  //     searchHistoryArr = JSON.parse(searchHistoryStr);
  //     if (searchHistoryArr[4]) searchHistoryArr.shift();
  //   }

  //   searchHistoryArr.push({from: from, to: to})

  //   searchHistoryStr = JSON.stringify(searchHistoryArr);
  //   localStorage.setItem('searchHistory', searchHistoryStr)
  // }

  setSearchHistoryToFirebase(dates: {from: number, to: number}) {
    const { from, to } = dates;
    try {
    this.auth.getCurrentUser().subscribe(user => this.history.addSearch(user.uid, Date.now(), from, to));
    } catch (error) {
      console.error(error);
    }
  }

  onSubmit(): void {
    let {from, to} = this.apodFromTo.value

    let dates: DatesNums = {from: null, to: null};
    dates.from = from.getTime();
    dates.to = to.getTime();

    this.setSearchHistoryToFirebase(dates)
    this.dateRangeSubmitted.emit(dates)
  }

  get from() { return this.apodFromTo.get('from'); }
  get to() { return this.apodFromTo.get('to'); }

  ngOnInit(): void {
  }

}
