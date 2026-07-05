import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TenantService } from '../../Service/tenant.service';
import { CreateTenantRequest, PropertySummary } from '../../Models/models';

@Component({
  selector: 'app-add-tenant-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './add-tenant-dialog.component.html',
  styleUrls: ['./add-tenant-dialog.component.scss'],
})
export class AddTenantDialogComponent implements OnInit {
  form: FormGroup;
  loading = false;
  loadingProperties = false;
  errorMessage = '';

  properties: PropertySummary[] = [];

  readonly rentTypes = ['Monthly', 'Quarterly', 'Yearly', 'Daily'];

  constructor(
    private fb: FormBuilder,
    private tenantService: TenantService,
    private dialogRef: MatDialogRef<AddTenantDialogComponent>
  ) {
    this.form = this.fb.group({
      propertyId:  ['', Validators.required],
      tenantName:  ['', [Validators.required, Validators.minLength(2)]],
      proofNumber: ['', Validators.required],
      rentType:    ['', Validators.required],
      shopName:    [''],
      startDate:   [new Date(), Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadingProperties = true;
    this.tenantService.getPropertySummaries().subscribe({
      next: (props) => {
        this.properties = props;
        this.loadingProperties = false;
      },
      error: () => {
        this.loadingProperties = false;
        this.errorMessage = 'Could not load properties. Please try again.';
      },
    });
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const v = this.form.value;
    const payload: CreateTenantRequest = {
      propertyId:  v.propertyId,
      tenantName:  v.tenantName,
      proofNumber: v.proofNumber,
      rentType:    v.rentType,
      startDate:   (v.startDate as Date).toISOString(),
      ...(v.shopName ? { shopName: v.shopName } : {}),
    };

    this.loading = true;
    this.errorMessage = '';

    this.tenantService.create(payload).subscribe({
      next: (created) => {
        this.loading = false;
        this.dialogRef.close(created);
      },
      error: (err) => {
        this.loading = false;
        this.errorMessage =
          err?.error?.message ?? 'Something went wrong. Please try again.';
      },
    });
  }

  onCancel(): void {
    this.dialogRef.close(null);
  }
}
