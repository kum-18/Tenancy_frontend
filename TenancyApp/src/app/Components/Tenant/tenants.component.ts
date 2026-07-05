import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { TenantService } from '../../Service/tenant.service';
import { TenantSummary } from '../../Models/models';
import { AddTenantDialogComponent } from '../AddTenentDialog/add-tenant-dialog.component';

@Component({
  selector: 'app-tenants',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatProgressSpinnerModule,
    MatDialogModule,
  ],
  templateUrl: './tenants.component.html',
  styleUrls: ['./tenants.component.scss'],
})
export class TenantsComponent implements OnInit {
  tenants: TenantSummary[] = [];
  loading = false;
  errorMessage = '';

  readonly displayedColumns: string[] = [
    'tenantName',
    'propertyName',
    'rentType',
    'shopName',
    'startDate',
    'endDate',
    'isActive',
  ];

  constructor(
    private tenantService: TenantService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadTenants();
  }

  loadTenants(): void {
    this.loading = true;
    this.errorMessage = '';

    this.tenantService.getAll().subscribe({
      next: (tenants) => {
        this.tenants = tenants;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.errorMessage = 'Could not load tenants. Please try again.';
      },
    });
  }

  openAddTenantDialog(): void {
    const dialogRef = this.dialog.open(AddTenantDialogComponent, {
      width: '480px',
      autoFocus: false,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadTenants();
      }
    });
  }

  onRowClick(tenant: TenantSummary): void {
    this.router.navigate(['/tenants', tenant.id]);
  }
}
