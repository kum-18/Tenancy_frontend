import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { merge } from 'rxjs';
import { tap, switchMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

import { MonthlyDetailsService } from '../../Service/monthly-details.service';
import { MonthlyDetailsCollection } from '../../Models/models';

@Component({
  selector: 'app-monthly-details',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatButtonModule,
  ],
  templateUrl: './monthly-details.component.html',
  styleUrls: ['./monthly-details.component.scss'],
})
export class MonthlyDetailsComponent implements OnInit, AfterViewInit {
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  readonly displayedColumns: string[] = [
    'billingMonth',
    'propertyName',
    'totalMonthlyRent',
    'amountPaid',
    'balance',
  ];

  data: MonthlyDetailsCollection[] = [];
  totalCount = 0;
  loading = false;
  errorMessage = '';

  readonly pageSizeOptions = [10, 25, 50];

  constructor(
    private monthlyDetailsService: MonthlyDetailsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Initial load happens in ngAfterViewInit once sort/paginator are available.
  }

  ngAfterViewInit(): void {
    // Reset to first page whenever the sort changes.
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(tap(() => this.fetchData()))
      .subscribe();

    // Initial fetch (page 1, no sort).
    this.fetchData();
  }

  private fetchData(): void {
    this.loading = true;
    this.errorMessage = '';

    const sortField = this.sort?.active;
    const sortDirection = (this.sort?.direction || undefined) as
      | 'asc'
      | 'desc'
      | undefined;

    this.monthlyDetailsService
      .getPaged({
        pageNumber: (this.paginator?.pageIndex ?? 0) + 1, // backend is 1-indexed
        pageSize: this.paginator?.pageSize ?? this.pageSizeOptions[0],
        sortBy: sortField,
        sortDirection,
      })
      .pipe(
        catchError(() => {
          this.errorMessage = 'Could not load monthly details. Please try again.';
          return of(null);
        })
      )
      .subscribe((result) => {
        this.loading = false;
        if (result) {
          this.data = result.items;
          this.totalCount = result.totalCount;
        }
      });
  }

  onRetry(): void {
    this.fetchData();
  }

  onRowClick(row: MonthlyDetailsCollection): void {
    this.router.navigate(['/monthly-details', row.guid]);
  }
}
