import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable()
export class AuthService {
  private host = environment.host;

  constructor(private http: HttpClient) {}

  login(data) {
    return this.http.post(`${this.host}/api/auth/login`, data);
  }

  registration(data) {
    return this.http.post(`${this.host}/api/auth/register`, data);
  }
}
