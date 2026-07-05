import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  GenerateBillRequest,
  RecordPaymentRequest,
  TenantLookup,
} from '../Models/models';

// TODO: Replace with your actual API base URL
const API_BASE = 'https://your-api-base-url.com/api';

@Injectable({ providedIn: 'root' })
export class AddMonthlyDetailsService {
  private readonly tenantLookupEndpoint = `${API_BASE}/tenants/lookup`;
  private readonly recordPaymentEndpoint = `${API_BASE}/monthly-details/payment`;
  private readonly generateBillEndpoint = `${API_BASE}/monthly-details/generate`;

  constructor(private http: HttpClient) {}

  getTenants(): Observable<TenantLookup[]> {
    return this.http.get<TenantLookup[]>(this.tenantLookupEndpoint);
  }

  recordPayment(payload: RecordPaymentRequest): Observable<void> {
    return this.http.post<void>(this.recordPaymentEndpoint, payload);
  }

  generateBill(payload: GenerateBillRequest): Observable<void> {
    const params = new HttpParams()
      .set('tenantId', payload.tenantId)
      .set('newReading', payload.newReading);

    return this.http.post<void>(this.generateBillEndpoint, null, { params });
  }
}
