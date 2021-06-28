import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL } from '../shared/constants';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) {}

  getUserInfo(id: number): Observable<any> {
    return this.http.get(`${API_URL}/users/${id}`, {
      responseType: 'json'
    });
  }

  getTrips(): Observable<any> {
    return this.http.get(`${API_URL}/trips`, {
      responseType: 'text'
    });
  }
}
