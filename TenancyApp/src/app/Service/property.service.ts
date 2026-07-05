import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CreatePropertyRequest, Property } from '../Models/models';

// TODO: Replace with your actual API base URL
const API_BASE = 'https://your-api-base-url.com/api';

@Injectable({ providedIn: 'root' })
export class PropertyService {
  private readonly endpoint = `${API_BASE}/properties`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Property[]> {
    return this.http.get<Property[]>(this.endpoint);
  }

  create(payload: CreatePropertyRequest): Observable<Property> {
    return this.http.post<Property>(this.endpoint, payload);
  }
}
