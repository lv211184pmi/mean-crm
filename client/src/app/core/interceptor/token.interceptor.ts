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

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
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
