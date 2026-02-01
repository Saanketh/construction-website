import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  contactForm = {
    name: '',
    email: '',
    phone: '',
    message: ''
  };

  isSubmitting = false;
  submitMessage = '';

  constructor(private http: HttpClient) {}

  onSubmit() {
    if (this.isSubmitting) return;

    this.isSubmitting = true;
    this.submitMessage = '';

    // In a real application, you would send this to your backend
    this.http.post(`${environment.apiUrl}/api/contact`, this.contactForm)
      .subscribe({
        next: (response) => {
          this.isSubmitting = false;
          this.submitMessage = 'Thank you for contacting us! We will get back to you soon.';
          this.resetForm();
        },
        error: (err) => {
          this.isSubmitting = false;
          this.submitMessage = 'Failed to send message. Please try again.';
        }
      });
  }

  resetForm() {
    this.contactForm = {
      name: '',
      email: '',
      phone: '',
      message: ''
    };
  }
}