import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class DialogflowService {
  private baseURL: string = 'https://api.dialogflow.com/v1/query?v=20150910';
  private token: string = environment.token;

  constructor(private http: HttpClient) {}

  public getResponse(query: string) {
    const data = {
      query: query,
      lang: 'en',
      sessionId: '12345',
    };
    const test = {
      contexts: ['shop'],
      lang: 'en',
      query,
      sessionId: '12345',
      timezone: 'America/New_York',
    };

    return this.http.post(`${this.baseURL}`, test);
    // .pipe(
    //   map(res => {
    //     return res.json();
    //   }),
    // );
  }

  public getHeaders(): HttpHeaders {
    const headers = new HttpHeaders();
    headers.append('Authorization', `Bearer ${this.token}`);
    return headers;
  }
}
