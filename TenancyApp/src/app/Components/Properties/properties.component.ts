import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { PropertyService } from '../../Service/property.service';
import { Property } from '../../Models/models';
import { AddPropertyDialogComponent } from '../AddProperties/add-property-dialog.component';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-properties',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatIconModule
],
  templateUrl: './properties.component.html',
  styleUrls: ['./properties.component.scss'],
})
export class PropertiesComponent implements OnInit {
  properties: Property[] = [];
  loading = true;
  errorMessage = '';

  constructor(
    private propertyService: PropertyService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadProperties();
  }

  loadProperties(): void {
    this.loading = true;
    this.errorMessage = '';

    this.propertyService.getAll().subscribe({
      next: (data) => {
        this.properties = data;
        this.loading = false;
      },
      error: () => {
        this.errorMessage = 'Failed to load properties. Please try again.';
        this.loading = false;
      },
    });
  }

  navigateToProperty(guid: string): void {
    this.router.navigate(['/properties', guid]);
  }

  openAddDialog(): void {
    const dialogRef = this.dialog.open(AddPropertyDialogComponent, {
      width: '560px',
      maxWidth: '95vw',
      disableClose: false,
      data: {},
    });

    dialogRef.afterClosed().subscribe((result: Property | null) => {
      if (result) {
        this.loadProperties();
      }
    });
  }
}
