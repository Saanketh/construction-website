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
  private revealObserver?: IntersectionObserver;

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

        // Setup scroll-based reveal animations on the new page.
        setTimeout(() => this.setupScrollReveal(), 50);
      });
  }

  private setupScrollReveal(): void {
    if (!('IntersectionObserver' in window)) return;

    if (!this.revealObserver) {
      this.revealObserver = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              (entry.target as HTMLElement).classList.add('reveal-in');
              this.revealObserver?.unobserve(entry.target);
            }
          }
        },
        { root: null, threshold: 0.12, rootMargin: '0px 0px -10% 0px' }
      );
    }

    const selectors = [
      '.feature-card',
      '.project-card',
      '.service-detail',
      '.review-card',
      '.timeline-item',
      '.masonry-item',
      '.stat-item',
      '.highlight-card',
      '.info-item',
      '.contact-form',
      '.service-card-home'
    ];

    const nodes = Array.from(document.querySelectorAll(selectors.join(',')));
    for (const node of nodes) {
      const el = node as HTMLElement;
      if (el.classList.contains('reveal-in')) continue;
      if (!el.classList.contains('reveal')) el.classList.add('reveal');
      this.revealObserver.observe(el);
    }
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
