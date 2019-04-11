import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Overview } from '../../models/overview/overview.model';
import { Analytics } from '../../models/analytics/analytics.model';
import { catchError } from 'rxjs/operators';
import { GlobalService } from '../global.service';

@Injectable({ providedIn: 'root' })
export class AnalyticsService {
  constructor(private http: HttpClient, private gs: GlobalService) {}

  public getOverview(): Observable<Overview> {
    return this.http
      .get<Overview>(`${this.gs.host}/analytics/overview`)
      .pipe(catchError(err => this.gs.errorHandler(err)));
  }

  public getAnalytics(): Observable<Analytics> {
    return this.http
      .get<Analytics>(`${this.gs.host}/analytics/analytics`)
      .pipe(catchError(err => this.gs.errorHandler(err)));
  }
}
