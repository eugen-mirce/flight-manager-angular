import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { API_URL } from '../shared/constants';

const httpOptions = {
  observe: 'response' as 'response',
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(email: string, password: string): any {
    return this.http.post(
      `${API_URL}/users/login`,
      {
        email,
        password
      },
      httpOptions
    );
  }
}
