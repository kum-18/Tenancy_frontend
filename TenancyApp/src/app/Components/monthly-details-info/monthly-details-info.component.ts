import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-monthly-details-info',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div style="padding: 24px;">
      <h1>Monthly Detail</h1>
      <p>Guid: {{ guid }}</p>
      <p>TODO: fetch and display full monthly detail record by guid.</p>
    </div>
  `,
})
export class MonthlyDetailsInfoComponent implements OnInit {
  guid = '';

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.guid = this.route.snapshot.paramMap.get('id') ?? '';
  }
}
