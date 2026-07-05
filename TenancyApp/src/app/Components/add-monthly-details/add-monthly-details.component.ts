import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

import { AddMonthlyDetailsService } from '../../Service/add-monthly-details.service';
import { TenantLookup } from '../../Models/models';

@Component({
  selector: 'app-add-monthly-details',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatTabsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
  ],
  templateUrl: './add-monthly-details.component.html',
  styleUrls: ['./add-monthly-details.component.scss'],
})
export class AddMonthlyDetailsComponent implements OnInit {
  tenants: TenantLookup[] = [];
  loadingTenants = false;
  tenantLoadError = '';

  paymentForm: FormGroup;
  billForm: FormGroup;

  submittingPayment = false;
  submittingBill = false;

  paymentError = '';
  billError = '';

  constructor(
    private fb: FormBuilder,
    private addMonthlyDetailsService: AddMonthlyDetailsService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
    this.paymentForm = this.fb.group({
      tenantId: ['', Validators.required],
      amountPaid: [null, [Validators.required, Validators.min(0.01)]],
    });

    this.billForm = this.fb.group({
      tenantId: ['', Validators.required],
      newReading: [null, [Validators.required, Validators.min(0)]],
    });
  }

  ngOnInit(): void {
    this.loadTenants();
  }

  loadTenants(): void {
    this.loadingTenants = true;
    this.tenantLoadError = '';

    this.addMonthlyDetailsService.getTenants().subscribe({
      next: (tenants) => {
        this.tenants = tenants;
        this.loadingTenants = false;
      },
      error: () => {
        this.loadingTenants = false;
        this.tenantLoadError = 'Could not load tenants. Please try again.';
      },
    });
  }

  submitPayment(): void {
    if (this.paymentForm.invalid) {
      this.paymentForm.markAllAsTouched();
      return;
    }

    const v = this.paymentForm.value;
    this.submittingPayment = true;
    this.paymentError = '';

    this.addMonthlyDetailsService
      .recordPayment({
        tenantId: v.tenantId,
        amountPaid: +v.amountPaid,
      })
      .subscribe({
        next: () => {
          this.submittingPayment = false;
          this.snackBar.open('Payment recorded successfully.', 'Close', {
            duration: 3000,
          });
          this.paymentForm.reset();
          this.router.navigate(['/monthly-details']);
        },
        error: (err) => {
          this.submittingPayment = false;
          this.paymentError =
            err?.error?.message ?? 'Could not record payment. Please try again.';
        },
      });
  }

  submitBill(): void {
    if (this.billForm.invalid) {
      this.billForm.markAllAsTouched();
      return;
    }

    const v = this.billForm.value;
    this.submittingBill = true;
    this.billError = '';

    this.addMonthlyDetailsService
      .generateBill({
        tenantId: v.tenantId,
        newReading: +v.newReading,
      })
      .subscribe({
        next: () => {
          this.submittingBill = false;
          this.snackBar.open('Monthly bill generated successfully.', 'Close', {
            duration: 3000,
          });
          this.billForm.reset();
          this.router.navigate(['/monthly-details']);
        },
        error: (err) => {
          this.submittingBill = false;
          this.billError =
            err?.error?.message ?? 'Could not generate bill. Please try again.';
        },
      });
  }
}
