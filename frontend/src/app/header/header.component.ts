import { Component } from '@angular/core';
import { AdminAuthService } from '../services/admin-auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  isMenuOpen = false;

  constructor(public adminAuth: AdminAuthService) {}

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
