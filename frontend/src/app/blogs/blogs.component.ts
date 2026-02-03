import { Component, OnInit } from '@angular/core';
import { DataService, Blog } from '../services/data.service';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.css']
})
export class BlogsComponent implements OnInit {
  blogs: Blog[] = [];
  loading = true;
  error: string | null = null;
  expandedBlogId: number | null = null;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.loadBlogs();
  }

  loadBlogs(): void {
    this.loading = true;
    this.dataService.getBlogs().subscribe({
      next: (data) => {
        this.blogs = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading blogs:', err);
        this.error = 'Failed to load blogs. Please try again later.';
        this.loading = false;
      }
    });
  }

  toggleReadMore(blogId: number): void {
    this.expandedBlogId = this.expandedBlogId === blogId ? null : blogId;
  }

  isExpanded(blogId: number): boolean {
    return this.expandedBlogId === blogId;
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
