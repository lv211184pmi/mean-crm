import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { map } from 'rxjs/operators';
import { BotMessage } from '../../models/chat/bot-message';
import { Message } from '../../models/chat/message.model';

@Injectable({ providedIn: 'root' })
export class DialogflowService {
  private baseURL: string = 'https://api.dialogflow.com/v1/query?v=20150910';
  private token: string = environment.token;

  constructor(private http: HttpClient) {}

  public getResponse(query: string): Observable<Message> {
    const data = {
      contexts: ['shop'],
      lang: 'en',
      query,
      sessionId: '12345',
      timezone: 'America/New_York',
    };

    return this.http.post<BotMessage>(`${this.baseURL}`, data).pipe(
      map(
        res =>
          new Message({
            content: res.result.fulfillment.speech,
            timestamp: res.timestamp,
          }),
      ),
    );
  }

  public getHeaders(): HttpHeaders {
    const headers = new HttpHeaders();
    headers.append('Authorization', `Bearer ${this.token}`);
    return headers;
  }
}
