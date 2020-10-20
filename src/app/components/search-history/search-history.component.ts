import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { SearchHistoryService } from 'src/app/services/history.service';

const MOCK_DATA = [
  {time: 1603115116497, from: 1601499600000, to:1601586000000},
  {time: 1603115100000, from: 1601586000000, to: 1601672400000},
  {time: 1603115000000, from: 1601672400000, to: 1601758800000}
]

@Component({
  selector: 'app-search-history',
  templateUrl: './search-history.component.html',
  styleUrls: ['./search-history.component.scss']
})
export class SearcheHistoryComponent implements OnInit {
  columnsToDisplay: string[] = ['time', 'from', 'to'];
  tableData = [];
  tableLength: number;

  constructor(private history: SearchHistoryService, private auth: AuthService) {
  }

  // gotoSearch

  ngOnInit(): void {
    this.auth.getCurrentUser().subscribe(user => {
      this.history.getHistory(user.uid)
      .subscribe(data => {
        this.tableData = data;
        this.tableLength = this.tableData.length;
      });
    });
  }

}
