import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private token: string = null;

  constructor(private router: Router) {}

  public setToken(token: string): string {
    localStorage.setItem('token', token);
    return (this.token = token);
  }

  public getToken(): string {
    return this.token;
  }

  public isAuthenticated(): boolean {
    return !!this.token;
  }

  public logout() {
    this.setToken(null);
    localStorage.clear();
    this.router.navigate(['/auth/login']);
  }
}
