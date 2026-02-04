import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

const SESSION_KEY = 'pb_admin_session';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthService {
  private readonly _isAdmin$ = new BehaviorSubject<boolean>(this.loadSession());
  readonly isAdmin$ = this._isAdmin$.asObservable();

  get isAdmin(): boolean {
    return this._isAdmin$.value;
  }

  login(username: string, password: string): boolean {
    const ok = username === 'admin' && password === 'admin';
    if (ok) {
      sessionStorage.setItem(SESSION_KEY, '1');
      this._isAdmin$.next(true);
    }
    return ok;
  }

  logout(): void {
    sessionStorage.removeItem(SESSION_KEY);
    this._isAdmin$.next(false);
  }

  private loadSession(): boolean {
    try {
      return sessionStorage.getItem(SESSION_KEY) === '1';
    } catch {
      return false;
    }
  }
}
