import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

import { Order } from '../../models/order/order.mode';
import { environment } from '../../../../environments/environment';
import { MaterialService } from '../material-utils/material.service';

@Injectable({ providedIn: 'root' })
export class OrderService {
  private host = `${environment.host}/api`;
  private alert = MaterialService.alert;

  constructor(private http: HttpClient) {}

  public createOrder(order: Order): Observable<Order> {
    return this.http.post<Order>(`${this.host}/order`, order).pipe(
      map((newOrder: Order) => {
        this.alert(`Order №${newOrder.order} was created successfully.`);
        return newOrder;
      }),
      catchError(err => this.errorHandle(err)),
    );
  }

  private errorHandle(err): Observable<any> {
    this.alert(err.error.message);
    return throwError(err);
  }
}
