import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  MonthlyDetailsCollection,
  MonthlyDetailsQuery,
  PagedResult,
} from '../Models/models';

// TODO: Replace with your actual API base URL
const API_BASE = 'https://your-api-base-url.com/api';

@Injectable({ providedIn: 'root' })
export class MonthlyDetailsService {
  private readonly endpoint = `${API_BASE}/monthly-details`;

  constructor(private http: HttpClient) {}

  getPaged(
    query: MonthlyDetailsQuery
  ): Observable<PagedResult<MonthlyDetailsCollection>> {
    let params = new HttpParams()
      .set('pageNumber', query.pageNumber)
      .set('pageSize', query.pageSize);

    if (query.sortBy) {
      params = params
        .set('sortBy', query.sortBy)
        .set('sortDirection', query.sortDirection ?? 'asc');
    }

    return this.http.get<PagedResult<MonthlyDetailsCollection>>(this.endpoint, {
      params,
    });
  }
}
