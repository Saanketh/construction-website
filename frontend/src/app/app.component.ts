import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'construction-website';

  constructor(private router: Router) {
    try {
      if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
      }
    } catch {
      // ignore
    }

    // GitHub Pages + hash routing can be inconsistent with Router scroll restoration.
    // Force scroll-to-top on every successful navigation.
    this.router.events
      .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
      .subscribe(() => {
        // Some browsers scroll the <html>, others scroll <body>
        setTimeout(() => {
          window.scrollTo({ top: 0, left: 0 });
          document.documentElement.scrollTop = 0;
          document.body.scrollTop = 0;
          if (document.scrollingElement) {
            document.scrollingElement.scrollTop = 0;
          }
        }, 0);
      });
  }
}
