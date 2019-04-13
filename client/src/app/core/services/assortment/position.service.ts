import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { MaterialService } from '../material-utils/material.service';
import { Message } from '../../models/shared/message.model';
import { Position } from '../../models/assortment/position.model';
import { GlobalService } from '../global.service';

@Injectable({ providedIn: 'root' })
export class PositionService {
  constructor(private http: HttpClient, private gs: GlobalService) {}
  private alert = MaterialService.alert;

  public getPositions(id: string): Observable<Position[] | any> {
    return this.http.get<Position[]>(`${this.gs.host}/position/${id}`).pipe(
      map((positions: Position[]) => positions),
      catchError(err => this.gs.errorHandler(err)),
    );
  }

  public createPosition(position: Position): Observable<Position> {
    return this.http.post<Position>(`${this.gs.host}/position`, position).pipe(
      map((pos: Position) => {
        this.alert('Position was created');
        return pos;
      }),
      catchError(err => this.gs.errorHandler(err)),
    );
  }

  public updatePosition(position: Position): Observable<Position> {
    return this.http
      .patch<Position>(`${this.gs.host}/position/${position._id}`, position)
      .pipe(
        map((pos: Position) => {
          this.alert('Position was updated');
          return pos;
        }),
        catchError(err => this.gs.errorHandler(err)),
      );
  }

  public removePosition(id: string): Observable<Message> {
    return this.http.delete<Message>(`${this.gs.host}/position/${id}`).pipe(
      map((message: Message) => {
        this.alert(message.message);
        return message;
      }),
      catchError(err => this.gs.errorHandler(err)),
    );
  }
}
