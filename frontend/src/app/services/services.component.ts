import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

interface Service {
  id: number;
  title: string;
  description: string;
  iconUrl: string;
}

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit {
  services: Service[] = [];
  isLoading = true;
  error: string | null = null;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadServices();
  }

  loadServices() {
    this.http.get<Service[]>(`${environment.apiUrl}/api/services`)
      .subscribe({
        next: (data) => {
          this.services = data;
          this.isLoading = false;
        },
        error: (err) => {
          console.error('Error loading services:', err);
          this.error = 'Failed to load services. Please try again later.';
          this.isLoading = false;
        }
      });
  }
}