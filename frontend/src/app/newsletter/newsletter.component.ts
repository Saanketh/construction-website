import { Component, OnInit } from '@angular/core';
import { DataService, Newsletter } from '../services/data.service';

@Component({
  selector: 'app-newsletter',
  templateUrl: './newsletter.component.html',
  styleUrls: ['./newsletter.component.css']
})
export class NewsletterComponent implements OnInit {
  newsletters: Newsletter[] = [];
  loading = true;
  error: string | null = null;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.loadNewsletters();
  }

  loadNewsletters(): void {
    this.loading = true;
    this.dataService.getNewsletters().subscribe({
      next: (data) => {
        this.newsletters = data.sort((a, b) => 
          new Date(b.date).getTime() - new Date(a.date).getTime()
        );
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading newsletters:', err);
        this.error = 'Failed to load newsletters. Please try again later.';
        this.loading = false;
      }
    });
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }
}
