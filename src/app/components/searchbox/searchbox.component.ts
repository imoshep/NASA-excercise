import { DatePipe } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { dateGreaterThenDateValidator, dateInThaPastValidator } from 'src/app/directives/date-validators.directive';
import { ParsedDates } from 'src/app/interfaces/parsed-dates';
import { NasaService } from 'src/app/services/nasa.service';

@Component({
  selector: 'app-searchbox',
  templateUrl: './searchbox.component.html',
  styleUrls: ['./searchbox.component.scss']
})
export class SearchboxComponent implements OnInit {
  @Output() dateRangeSubmitted = new EventEmitter<ParsedDates>();
  maxDate: Date;

  constructor(private nasaService: NasaService, private datepipe: DatePipe) {
    this.maxDate = new Date()
   }

  apodFromTo = new FormGroup ({
    from: new FormControl('', [Validators.required, dateInThaPastValidator(Date.now())]),
    to: new FormControl('', [Validators.required, dateInThaPastValidator(Date.now())]),
  }, [dateGreaterThenDateValidator])

  onSubmit(): void {
    let {from, to} = this.apodFromTo.value
    console.log();


    let parsedDates: ParsedDates = {from: null, to: null};
    parsedDates.from = from.getTime();
    parsedDates.to = to.getTime();

    this.dateRangeSubmitted.emit(parsedDates)
  }

  get from() { return this.apodFromTo.get('from'); }
  get to() { return this.apodFromTo.get('to'); }

  ngOnInit(): void {
  }

}
