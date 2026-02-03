import { Component } from '@angular/core';
import { animate, group, query, style, transition, trigger } from '@angular/animations';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('routeFade', [
      transition('* <=> *', [
        query(':enter, :leave', style({ position: 'fixed', left: 0, width: '100%' }), { optional: true }),
        group([
          query(':leave', [
            style({ opacity: 1, transform: 'translateY(0)' }),
            animate('180ms ease', style({ opacity: 0, transform: 'translateY(8px)' }))
          ], { optional: true }),
          query(':enter', [
            style({ opacity: 0, transform: 'translateY(10px)' }),
            animate('260ms ease', style({ opacity: 1, transform: 'translateY(0)' }))
          ], { optional: true })
        ]),
        query(':enter, :leave', style({ position: 'static', width: 'auto' }), { optional: true })
      ])
    ])
  ]
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

  prepareRoute(outlet: RouterOutlet | null | undefined): string {
    if (!outlet || !outlet.isActivated) return 'root';

    // RouterOutlet.activatedRoute is a getter that throws when not activated.
    // Guarded above, but keep a try/catch to avoid breaking initial render.
    try {
      return outlet.activatedRouteData?.['animation'] || outlet.activatedRoute?.routeConfig?.path || 'root';
    } catch {
      return 'root';
    }
  }
}
