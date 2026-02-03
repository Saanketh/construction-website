import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  constructor(private router: Router) {}

  private forceScrollTop(): void {
    window.scrollTo({ top: 0, left: 0 });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }

  navigate(path: string): void {
    // Avoid relying on built-in scroll restoration for hash-routing.
    this.router.navigateByUrl(path).then(() => {
      // Wait one tick so the new view is rendered.
      setTimeout(() => this.forceScrollTop(), 0);
    });
  }
}
