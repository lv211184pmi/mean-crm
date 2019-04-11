import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { MaterialService } from '../material-utils/material.service';
import { Category } from '../../models/assortment/category.model';
import { Message } from '../../models/shared/message.model';
import { GlobalService } from '../global.service';

@Injectable({ providedIn: 'root' })
export class CategoryService {
  constructor(
    private http: HttpClient,
    private router: Router,
    private gs: GlobalService,
  ) {}
  private alert = MaterialService.alert;

  public getAllCategories(): Observable<Category[] | any> {
    return this.http.get<Category[]>(`${this.gs.host}/category`).pipe(
      map((categories: Category[]) => categories),
      catchError(err => this.gs.errorHandler(err)),
    );
  }

  public getCategoryById(id: string): Observable<Category> {
    return this.http
      .get<Category>(`${this.gs.host}/category/${id}`)
      .pipe(catchError(err => this.gs.errorHandler(err)));
  }

  public createCategory(name: string, image?: File): Observable<any> {
    const fd = new FormData();
    if (image) {
      fd.append('image', image, image.name);
    }
    fd.append('name', name);

    return this.http.post<Category>(`${this.gs.host}/category`, fd).pipe(
      map((category: Category) => {
        this.alert('Category was created');
        return category;
      }),
      catchError(err => this.gs.errorHandler(err)),
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

    return this.http.patch<any>(`${this.gs.host}/category/${id}`, fd).pipe(
      map((category: Category) => {
        this.alert('Category was updated');
        return category;
      }),
      catchError(err => this.gs.errorHandler(err)),
    );
  }

  public removeCategory(id: string): Observable<Message> {
    return this.http.delete<Message>(`${this.gs.host}/category/${id}`).pipe(
      map((message: Message) => {
        this.alert(message.message);
        this.router.navigate(['../categories']);
        return message;
      }),
      catchError(err => this.gs.errorHandler(err)),
    );
  }
}
