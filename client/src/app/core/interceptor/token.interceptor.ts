import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { Router } from '@angular/router';

import { AuthService } from '../services/auth/auth.service';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  private botToken: string = environment.token;
  constructor(private auth: AuthService, private router: Router) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    if (this.auth.isAuthenticated()) {
      req = req.clone({
        setHeaders: {
          Authorization: this.auth.getToken(),
        },
      });
    }
    if (req.url.includes('dialogflow')) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${this.botToken}`,
        },
      });
    }

    return next
      .handle(req)
      .pipe(
        catchError((err: HttpErrorResponse) => this.handleErrorResponse(err)),
      );
  }

  private handleErrorResponse(error: HttpErrorResponse): Observable<any> {
    if (error.status === 401) {
      this.router.navigate(['/auth/login'], {
        queryParams: {
          sessionExpired: true,
        },
      });
    }
    return throwError(error);
  }
}
