import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-property-detail',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div style="padding: 40px; font-family: sans-serif; color: #111827;">
      <h2>Property Detail</h2>
      <p style="color:#6b7280;">Property ID: <strong>{{ propertyId }}</strong></p>
      <p style="color:#9ca3af;">This page is a placeholder — build it out as needed.</p>
    </div>
  `,
})
export class PropertyDetailComponent implements OnInit {
  propertyId = '';

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.propertyId = this.route.snapshot.paramMap.get('id') ?? '';
  }
}
