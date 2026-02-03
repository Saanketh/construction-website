import { Component } from '@angular/core';
import { DataService, ContactForm } from '../services/data.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  contactForm: ContactForm = {
    name: '',
    email: '',
    message: ''
  };
  submitting = false;
  success = false;
  error: string | null = null;

  constructor(private dataService: DataService) {}

  onSubmit() {
    if (!this.contactForm.name || !this.contactForm.email || !this.contactForm.message) {
      this.error = 'Please fill in all required fields.';
      return;
    }

    this.submitting = true;
    this.error = null;

    this.dataService.sendContactForm(this.contactForm).subscribe({
      next: (response) => {
        this.success = true;
        this.submitting = false;
        this.contactForm = {
          name: '',
          email: '',
          message: ''
        };
        setTimeout(() => {
          this.success = false;
        }, 5000);
      },
      error: (err) => {
        console.error('Error submitting contact form:', err);
        this.error = 'Failed to send message. Please try again later.';
        this.submitting = false;
      }
    });
  }

  resetSuccess() {
    this.success = false;
  }
}
