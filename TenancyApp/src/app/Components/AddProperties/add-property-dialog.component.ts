import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDividerModule } from '@angular/material/divider';
import { PropertyService } from '../../Service/property.service';
import { CreatePropertyRequest } from '../../Models/models';

@Component({
  selector: 'app-add-property-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatDividerModule,
  ],
  templateUrl: './add-property-dialog.component.html',
  styleUrls: ['./add-property-dialog.component.scss'],
})
export class AddPropertyDialogComponent {
  form: FormGroup;
  loading = false;
  errorMessage = '';

  readonly units = ['sq ft', 'sq m', 'cents', 'acres'];

  constructor(
    private fb: FormBuilder,
    private propertyService: PropertyService,
    private dialogRef: MatDialogRef<AddPropertyDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: unknown
  ) {
    this.form = this.fb.group({
      propertyName:     ['', [Validators.required, Validators.minLength(2)]],
      address:          ['', [Validators.required, Validators.minLength(5)]],
      baseRent:         [null, [Validators.required, Validators.min(0)]],
      baseCurrentPrice: [null, [Validators.required, Validators.min(0)]],
      // optional dimensions
      lengthValue: [null, [Validators.min(0)]],
      widthValue:  [null, [Validators.min(0)]],
      unit:        ['sq ft'],
    });
  }

  get hasDimensions(): boolean {
    const { lengthValue, widthValue } = this.form.value;
    return lengthValue != null || widthValue != null;
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const v = this.form.value;
    const payload: CreatePropertyRequest = {
      propertyName:     v.propertyName,
      address:          v.address,
      baseRent:         +v.baseRent,
      baseCurrentPrice: +v.baseCurrentPrice,
    };

    if (v.lengthValue != null || v.widthValue != null) {
      payload.dimensions = {
        lengthValue: +v.lengthValue,
        widthValue:  +v.widthValue,
        unit:        v.unit,
      };
    }

    this.loading = true;
    this.errorMessage = '';

    this.propertyService.create(payload).subscribe({
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
