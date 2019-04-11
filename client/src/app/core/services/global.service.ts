import { Injectable } from '@angular/core';
import { throwError, Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { MaterialService } from './material-utils/material.service';

@Injectable({ providedIn: 'root' })
export class GlobalService {
  private alert = MaterialService.alert;
  public host = `${environment.host}/api`;

  public errorHandler(err): Observable<any> {
    this.alert(err.error.message);
    return throwError(err);
  }
}
