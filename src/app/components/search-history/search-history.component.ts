import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { SearchHistoryService } from 'src/app/services/history.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ToastService } from 'angular-toastify';

@Component({
  selector: 'app-search-history',
  templateUrl: './search-history.component.html',
  styleUrls: ['./search-history.component.scss']
})
export class SearcheHistoryComponent implements OnInit, AfterViewInit {
  columnsToDisplay: string[] = ['time', 'from', 'to'];
  tableData;
  tableLength: number;
  isLoading: boolean = true;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private history: SearchHistoryService, private auth: AuthService, private router: Router, private toast:ToastService) {
  }

  // gotoSearch

  ngOnInit(): void {
    this.auth.getCurrentUser().subscribe(user => {
      if (user) {
      this.history.getHistory(user.uid)
      .subscribe(data => {
        this.tableData = new MatTableDataSource<any>(data);
        this.tableLength = data.length;
        console.log(this.paginator);
        this.tableData.paginaotr = this.paginator;
        this.isLoading = false;
      })} else {
        this.toast.error('No user found, plese sign-in');
        this.router.navigateByUrl('/')
      }
    });
  }

  ngAfterViewInit(): void {
  }
}
