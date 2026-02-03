import { Component, OnInit } from '@angular/core';
import { DataService, Project } from '../services/data.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
  projects: Project[] = [];
  loading = true;
  error: string | null = null;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.loadProjects();
  }

  loadProjects(): void {
    this.dataService.getProjects().subscribe({
      next: (data) => {
        this.projects = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading projects:', err);
        this.error = 'Failed to load projects. Please try again later.';
        this.loading = false;
      }
    });
  }

  getCategoryClass(category: string): string {
    const categoryMap: { [key: string]: string } = {
      'Commercial': 'category-commercial',
      'Residential': 'category-residential',
      'Infrastructure': 'category-infrastructure'
    };
    return categoryMap[category] || 'category-default';
  }
}
