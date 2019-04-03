import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { environment } from '../../../../environments/environment';
import { MaterialService } from '../material-utils/material.service';
import { Category } from '../../models/assortment/category.model';
import { Message } from '../../models/message.model';

@Injectable({ providedIn: 'root' })
export class CategoryService {
  constructor(private http: HttpClient, private router: Router) {}
  private host = `${environment.host}/api`;
  private alert = MaterialService.alert;

  public getAllCategories(): Observable<Category[] | any> {
    return this.http.get<Category[]>(`${this.host}/category`).pipe(
      map((categories: Category[]) => categories),
      catchError(err => this.errorHandle(err)),
    );
  }

  public getCategoryById(id: string): Observable<Category> {
    return this.http
      .get<Category>(`${this.host}/category/${id}`)
      .pipe(catchError(err => this.errorHandle(err)));
  }

  public createCategory(name: string, image?: File): Observable<any> {
    const fd = new FormData();
    if (image) {
      fd.append('image', image, image.name);
    }
    fd.append('name', name);

    return this.http.post<Category>(`${this.host}/category`, fd).pipe(
      map((category: Category) => {
        this.alert('Category was created');
        return category;
      }),
      catchError(err => this.errorHandle(err)),
    );
  }

  public updateCategory(
    id: string,
    name: string,
    image?: File,
  ): Observable<any> {
    const fd = new FormData();
    if (image) {
      fd.append('image', image, image.name);
    }
    fd.append('name', name);

    return this.http.patch<any>(`${this.host}/category/${id}`, fd).pipe(
      map((category: Category) => {
        this.alert('Category was updated');
        return category;
      }),
      catchError(err => this.errorHandle(err)),
    );
  }

  public removeCategory(id: string): Observable<Message> {
    return this.http.delete<Message>(`${this.host}/category/${id}`).pipe(
      map((message: Message) => {
        this.alert(message.message);
        this.router.navigate(['../categories']);
        return message;
      }),
      catchError(err => this.errorHandle(err)),
    );
  }

  private errorHandle(err): Observable<HttpErrorResponse> {
    this.alert(err.error.message);
    return throwError(err);
  }
}
