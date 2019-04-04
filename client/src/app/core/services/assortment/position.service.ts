import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { environment } from '../../../../environments/environment';
import { MaterialService } from '../material-utils/material.service';
import { Message } from '../../models/message.model';
import { Position } from '../../models/assortment/position.model';

@Injectable({ providedIn: 'root' })
export class PositionService {
  constructor(private http: HttpClient) {}

  private host = `${environment.host}/api`;
  private alert = MaterialService.alert;

  public getPositions(id: string): Observable<Position[] | any> {
    return this.http.get<Position[]>(`${this.host}/position/${id}`).pipe(
      map((positions: Position[]) => positions),
      catchError(err => this.errorHandle(err)),
    );
  }

  public createPosition(position: Position): Observable<Position> {
    return this.http.post<Position>(`${this.host}/position`, position).pipe(
      map((pos: Position) => {
        this.alert('Position was created');
        return pos;
      }),
      catchError(err => this.errorHandle(err)),
    );
  }

  public updatePosition(position: Position): Observable<Position> {
    return this.http
      .patch<Position>(`${this.host}/position/${position._id}`, position)
      .pipe(
        map((pos: Position) => {
          this.alert('Position was updated');
          return pos;
        }),
        catchError(err => this.errorHandle(err)),
      );
  }

  public removePosition(id: string): Observable<Message> {
    return this.http.delete<Message>(`${this.host}/position/${id}`).pipe(
      map((message: Message) => {
        this.alert(message.message);
        return message;
      }),
      catchError(err => this.errorHandle(err)),
    );
  }

  private errorHandle(err): Observable<any> {
    this.alert(err.error.message);
    return throwError(err);
  }
}
