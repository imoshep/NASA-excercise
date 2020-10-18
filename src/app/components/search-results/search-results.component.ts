import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs';
import { dateInThaPastValidator } from 'src/app/directives/date-validators.directive';
import { Apod } from 'src/app/interfaces/apod';
import { DatesNums } from 'src/app/interfaces/numbered-dates';
import { NasaService } from 'src/app/services/nasa.service';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent implements OnInit, OnDestroy, OnChanges {
  @Input() dateRange: DatesNums;
  public initSubscription: Subscription;
  public searchSubscription:Subscription;
  public apodsToDisplay: Apod[] = [];


  constructor(private nasaService: NasaService) { }

  populateImages(): Subscription {
    const day = 1000*60*60*24;
    const today = Date.now();
    // FROM - TO THE PRESENT DAY
    return this.nasaService.getImages({from: today - 5*day, to: today}).subscribe(res => this.apodsToDisplay = res)
  }

  ngOnInit(): void {
    this.initSubscription = this.populateImages();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.dateRange && this.dateRange){
      this.searchSubscription = this.nasaService.getImages(this.dateRange).subscribe((res: Apod[]) => {
        this.apodsToDisplay = res;
      });
    }
  }

  ngOnDestroy(): void {
    this.initSubscription && this.initSubscription.unsubscribe();
    this.searchSubscription && this.searchSubscription.unsubscribe();
  }

}
