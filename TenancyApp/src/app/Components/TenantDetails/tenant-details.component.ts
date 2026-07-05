import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tenant-details',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div style="padding: 24px;">
      <h1>Tenant Details</h1>
      <p>Tenant ID: {{ tenantId }}</p>
      <p>TODO: fetch and display full tenant details via TenantService.getById(id)</p>
    </div>
  `,
})
export class TenantDetailsComponent implements OnInit {
  tenantId = '';

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.tenantId = this.route.snapshot.paramMap.get('id') ?? '';
  }
}
