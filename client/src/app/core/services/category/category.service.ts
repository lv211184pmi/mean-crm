import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

import { environment } from '../../../../environments/environment';
import { MaterialService } from '../material-utils/material.service';
import { Category } from '../../models/category/category.model';
import { catchError } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class CategoryService {
  constructor(private http: HttpClient) {}
  private host = `${environment.host}/api`;
  private alert = MaterialService.alert;

  public getAllCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.host}/category`).pipe(
      catchError(err => {
        this.alert(err.error.message);
        return throwError(err);
      }),
    );
  }

  public getCategoryById(id: string): Observable<Category> {
    return this.http.get<Category>(`${this.host}/category/${id}`).pipe(
      catchError(err => {
        this.alert(err.error.message);
        return throwError(err);
      }),
    );
  }

  public createCategory(category: Category): Observable<any> {
    return this.http.post<any>(`${this.host}/category`, category).pipe(
      catchError(err => {
        this.alert(err.error.message);
        return throwError(err);
      }),
    );
  }

  public updateCategory(category: Category, id: string): Observable<any> {
    return this.http.patch<any>(`${this.host}/category/${id}`, category).pipe(
      catchError(err => {
        this.alert(err.error.message);
        return throwError(err);
      }),
    );
  }

  public removeCategory(id: string): Observable<any> {
    return this.http.delete<any>(`${this.host}/category/${id}`).pipe(
      catchError(err => {
        this.alert(err.error.message);
        return throwError(err);
      }),
    );
  }
}
