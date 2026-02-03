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
    // GitHub Pages + hash routing can be inconsistent with Router scroll restoration.
    // Force scroll-to-top on every successful navigation.
    this.router.events
      .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
      .subscribe(() => {
        window.scrollTo({ top: 0, left: 0 });
      });
  }
}
