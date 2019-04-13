import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { Order } from '../../models/order/order.model';
import { MaterialService } from '../material-utils/material.service';
import { GlobalService } from '../global.service';

@Injectable({ providedIn: 'root' })
export class OrderService {
  private alert = MaterialService.alert;

  constructor(private http: HttpClient, private gs: GlobalService) {}

  public createOrder(order: Order): Observable<Order> {
    return this.http.post<Order>(`${this.gs.host}/order`, order).pipe(
      map((newOrder: Order) => {
        this.alert(`Order №${newOrder.order} was created successfully.`);
        return newOrder;
      }),
      catchError(err => this.gs.errorHandler(err)),
    );
  }

  public getOrder(params: any = {}): Observable<Order[]> {
    return this.http
      .get<Order[]>(`${this.gs.host}/order`, {
        params: new HttpParams({ fromObject: params }),
      })
      .pipe(catchError(err => this.gs.errorHandler(err)));
  }
}
