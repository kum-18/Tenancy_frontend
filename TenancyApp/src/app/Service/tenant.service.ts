import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  CreateTenantRequest,
  PropertySummary,
  TenantSummary,
} from '../Models/models';

// TODO: Replace with your actual API base URL
const API_BASE = 'https://your-api-base-url.com/api';

@Injectable({ providedIn: 'root' })
export class TenantService {
  private readonly tenantEndpoint = `${API_BASE}/tenants`;
  private readonly propertyLookupEndpoint = `${API_BASE}/properties/summary`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<TenantSummary[]> {
    return this.http.get<TenantSummary[]>(this.tenantEndpoint);
  }

  getById(id: string): Observable<TenantSummary> {
    return this.http.get<TenantSummary>(`${this.tenantEndpoint}/${id}`);
  }

  create(payload: CreateTenantRequest): Observable<TenantSummary> {
    return this.http.post<TenantSummary>(this.tenantEndpoint, payload);
  }

  // Used to populate the Property dropdown in the Add Tenant dialog
  getPropertySummaries(): Observable<PropertySummary[]> {
    return this.http.get<PropertySummary[]>(this.propertyLookupEndpoint);
  }
}
