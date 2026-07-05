import { Routes } from '@angular/router';

export const routes: Routes = [
  // Default: redirect root to /properties
  {
    path: '',
    redirectTo: 'properties',
    pathMatch: 'full',
  },
  // Properties list
  {
    path: 'properties',
    loadComponent: () =>
      import('./Components/Properties/properties.component').then(
        (m) => m.PropertiesComponent
      ),
  },
  // Property detail (future)
  {
    path: 'properties/:id',
    loadComponent: () =>
      import('./Components/PropertiesDetails/property-detail.component').then(
        (m) => m.PropertyDetailComponent
      ),
  },
  {
    path: 'tenants',
    loadComponent: () =>
      import('./Components/Tenant/tenants.component').then(
        (m) => m.TenantsComponent
      ),
  },
  {
    path: 'tenants/:id',
    loadComponent: () =>
      import('./Components/TenantDetails/tenant-details.component').then(
        (m) => m.TenantDetailsComponent
      ),
  },
  {
    path: 'monthly-details',
    loadComponent: () =>
      import('./Components/monthly-details/monthly-details.component').then(
        (m) => m.MonthlyDetailsComponent
      ),
  },
  {
    path: 'add-monthly-details',
    loadComponent: () =>
      import(
        './Components/add-monthly-details/add-monthly-details.component'
      ).then((m) => m.AddMonthlyDetailsComponent),
  },
  {
    path: 'monthly-details/:id',
    loadComponent: () =>
      import(
        './Components/monthly-details-info/monthly-details-info.component'
      ).then((m) => m.MonthlyDetailsInfoComponent),
  },

  // Catch-all fallback
  {
    path: '**',
    redirectTo: 'properties',
  },
];