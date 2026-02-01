import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

interface Project {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  category: string;
  completionDate: string;
}

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
  projects: Project[] = [];
  filteredProjects: Project[] = [];
  categories: string[] = [];
  selectedCategory: string = '';
  isLoading = true;
  error: string | null = null;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadProjects();
  }

  loadProjects() {
    this.http.get<Project[]>(`${environment.apiUrl}/api/projects`)
      .subscribe({
        next: (data) => {
          this.projects = data;
          this.filteredProjects = data;
          this.extractCategories();
          this.isLoading = false;
        },
        error: (err) => {
          console.error('Error loading projects:', err);
          this.error = 'Failed to load projects. Please try again later.';
          this.isLoading = false;
        }
      });
  }

  extractCategories() {
    this.categories = [...new Set(this.projects.map(p => p.category))];
  }

  filterByCategory(category: string) {
    this.selectedCategory = category;
    if (category === '') {
      this.filteredProjects = this.projects;
    } else {
      this.filteredProjects = this.projects.filter(p => 
        p.category.toLowerCase() === category.toLowerCase()
      );
    }
  }

  clearFilter() {
    this.selectedCategory = '';
    this.filteredProjects = this.projects;
  }
}