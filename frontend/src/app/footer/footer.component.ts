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
    const doScroll = () => {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
      if (document.scrollingElement) {
        document.scrollingElement.scrollTop = 0;
      }
    };

    // Do it a few times to beat layout/paint timing.
    doScroll();
    requestAnimationFrame(doScroll);
    setTimeout(doScroll, 50);
    setTimeout(doScroll, 250);
  }

  navigate(path: string): void {
    // Avoid relying on built-in scroll restoration for hash-routing.
    this.forceScrollTop();
    this.router.navigateByUrl(path).then(() => {
      // Wait one tick so the new view is rendered.
      setTimeout(() => this.forceScrollTop(), 0);
    });
  }

  reload(): void {
    this.forceScrollTop();
    window.location.reload();
  }
}
