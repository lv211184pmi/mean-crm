import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { tap, catchError, map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

import { environment } from '../../../../environments/environment';
import { User } from '../../models/auth/user.model';
import { AuthService } from './auth.service';
import { MaterialService } from '../material-utils/material.service';

declare interface Token {
  token: string;
}

@Injectable({ providedIn: 'root' })
export class LoginService {
  private host = `${environment.host}/api`;
  private alert = MaterialService.alert;

  constructor(
    private http: HttpClient,
    private router: Router,
    private auth: AuthService,
  ) {}

  login(user: User): Observable<Token> {
    return this.http.post<Token>(`${this.host}/auth/login`, user).pipe(
      map(({ token }) => {
        this.auth.setToken(token);
        this.router.navigate(['/overview']);
      }),
      catchError(err => {
        this.alert(err.error.message);
        return of(err);
      }),
    );
  }

  registration(user: User) {
    return this.http.post(`${this.host}/auth/register`, user).pipe(
      tap(() => {
        this.router.navigate(['/auth/login'], {
          queryParams: { registered: true },
        });
      }),
      catchError(err => {
        this.alert(err.error.message);
        return of(err);
      }),
    );
  }
}
