import { Component, OnInit } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { DataService, Service } from '../services/data.service';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css'],
  animations: [
    trigger('expandCollapse', [
      state('collapsed', style({
        height: '0px',
        opacity: 0,
        paddingTop: '0px',
        paddingBottom: '0px',
        marginTop: '0px'
      })),
      state('expanded', style({
        height: '*',
        opacity: 1,
        paddingTop: '*',
        paddingBottom: '*',
        marginTop: '*'
      })),
      transition('collapsed <=> expanded', animate('260ms ease'))
    ])
  ]
})
export class ServicesComponent implements OnInit {
  services: Service[] = [];
  loading = true;
  error: string | null = null;
  expanded: Record<number, boolean> = {};

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.loadServices();
  }

  loadServices(): void {
    this.dataService.getServices().subscribe({
      next: (data) => {
        this.services = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading services:', err);
        this.error = 'Failed to load services. Please try again later.';
        this.loading = false;
      }
    });
  }

  toggleApproach(serviceId: number): void {
    this.expanded[serviceId] = !this.expanded[serviceId];
  }

  isExpanded(serviceId: number): boolean {
    return !!this.expanded[serviceId];
  }
}
