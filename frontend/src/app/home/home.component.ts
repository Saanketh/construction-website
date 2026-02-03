import { Component, OnInit } from '@angular/core';
import { DataService, Project } from '../services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  featuredProjects: Project[] = [];
  filteredProjects: Project[] = [];
  loading = true;
  
  // Filter options
  projectTypes: string[] = ['Residential', 'Commercial'];
  locations: string[] = ['Shankar Nagar', 'Kamal Vihar', 'Amlidih', 'Devendra Nagar'];
  statuses: string[] = ['Completed', 'In Progress', 'Yet to plan'];
  
  // Selected filters
  selectedType: string = '';
  selectedLocation: string = '';
  selectedStatus: string = '';

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.loadFeaturedProjects();
  }

  loadFeaturedProjects(): void {
    this.dataService.getProjects().subscribe({
      next: (data) => {
        this.featuredProjects = data;
        this.filteredProjects = data; // Initially show all
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading featured projects:', err);
        this.loading = false;
      }
    });
  }

  applyFilters(): void {
    this.filteredProjects = this.featuredProjects.filter(project => {
      const typeMatch = !this.selectedType || project.category === this.selectedType;
      const locationMatch = !this.selectedLocation || project.location === this.selectedLocation;
      const statusMatch = !this.selectedStatus || project.status === this.selectedStatus;
      
      return typeMatch && locationMatch && statusMatch;
    });
  }

  clearFilters(): void {
    this.selectedType = '';
    this.selectedLocation = '';
    this.selectedStatus = '';
    this.filteredProjects = this.featuredProjects;
  }
}
