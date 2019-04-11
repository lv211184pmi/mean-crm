import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { tap, catchError, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { User } from '../../models/auth/user.model';
import { AuthService } from './auth.service';
import { GlobalService } from '../global.service';

declare interface Token {
  token: string;
}

@Injectable({ providedIn: 'root' })
export class LoginService {
  constructor(
    private http: HttpClient,
    private router: Router,
    private auth: AuthService,
    private gs: GlobalService,
  ) {}

  login(user: User): Observable<Token> {
    return this.http.post<Token>(`${this.gs.host}/auth/login`, user).pipe(
      map(({ token }) => {
        this.auth.setToken(token);
        this.router.navigate(['/overview']);
      }),
      catchError(err => this.gs.errorHandler(err)),
    );
  }

  registration(user: User) {
    return this.http.post(`${this.gs.host}/auth/register`, user).pipe(
      tap(() => {
        this.router.navigate(['/auth/login'], {
          queryParams: { registered: true },
        });
      }),
      catchError(err => this.gs.errorHandler(err)),
    );
  }
}
