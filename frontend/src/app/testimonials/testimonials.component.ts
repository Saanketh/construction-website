import { Component, OnInit } from '@angular/core';
import { DataService, Review } from '../services/data.service';

@Component({
  selector: 'app-testimonials',
  templateUrl: './testimonials.component.html',
  styleUrls: ['./testimonials.component.css']
})
export class TestimonialsComponent implements OnInit {
  testimonials: Review[] = [];

  stars = [1, 2, 3, 4, 5];

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.getReviews().subscribe({
      next: (data) => (this.testimonials = data),
      error: () => (this.testimonials = [])
    });
  }
}
