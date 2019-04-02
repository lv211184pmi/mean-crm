import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { User } from '../../models/auth/user.model';

@Injectable()
export class AuthService {
  private host = environment.host;

  constructor(private http: HttpClient) {}

  login(user: User) {
    return this.http.post(`${this.host}/api/auth/login`, user);
  }

  registration(user: User) {
    return this.http.post(`${this.host}/api/auth/register`, user);
  }
}
