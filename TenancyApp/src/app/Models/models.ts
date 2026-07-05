export interface Property {
  guid: string;
  propertyName: string;
  address: string;
  baseRent: number;
}

export interface PropertyDimensions {
  lengthValue: number;
  widthValue: number;
  unit: string;
}

export interface CreatePropertyRequest {
  propertyName: string;
  address: string;
  baseRent: number;
  baseCurrentPrice: number;
  dimensions?: PropertyDimensions;
}

export interface TenantSummary {
  id: string;
  tenantName: string;
  rentType: string;
  shopName?: string | null;
  propertyName: string;
  startDate: string;   // ISO date string
  endDate?: string | null;
  isActive: boolean;
}

export interface PropertySummary {
  guid: string;
  propertyName: string;
  address: string;
}

export interface CreateTenantRequest {
  propertyId: string;
  tenantName: string;
  proofNumber: string;
  rentType: string;
  shopName?: string;
  startDate: string; // ISO date string
}

export interface MonthlyDetailsCollection {
  guid: string;
  billingMonth: string; // DateOnly -> ISO date string e.g. "2026-06-01"
  totalMonthlyRent: number;
  amountPaid: number;
  propertyName: string;
}

export interface PagedResult<T> {
  items: T[];
  totalCount: number;
  pageNumber: number;
  pageSize: number;
}

export interface MonthlyDetailsQuery {
  pageNumber: number;
  pageSize: number;
  sortBy?: string;
  sortDirection?: 'asc' | 'desc';
}

export interface TenantLookup {
  id: string;
  tenantName: string;
  rentType: string;
}

export interface RecordPaymentRequest {
  tenantId: string;
  amountPaid: number;
}

export interface GenerateBillRequest {
  tenantId: string;
  newReading: number;
}