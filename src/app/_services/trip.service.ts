import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL } from '../shared/constants';
import { Trip } from '../_models/trip';

@Injectable({
  providedIn: 'root'
})
export class TripService {
  constructor(private http: HttpClient) {}

  getAll(userId: number): Observable<Trip[]> {
    return this.http.get<Trip[]>(`${API_URL}/users/${userId}/trips`);
  }
  get(userId: number, tripId: number): Observable<Trip> {
    return this.http.get<Trip>(`${API_URL}/users/${userId}/trips/${tripId}`);
  }
  create(userId: number, data: any): Observable<any> {
    return this.http.post<any>(`${API_URL}/users/${userId}/trips`, data);
  }
  update(userId: number, tripId: number, data: any): Observable<any> {
    return this.http.put(`${API_URL}/users/${userId}/trips/${tripId}`, data);
  }
  delete(userId: number, tripId: number): Observable<any> {
    return this.http.delete(`${API_URL}/users/${userId}/trips/${tripId}`, {
      responseType: 'text'
    });
  }
  requestApproval(userId: number, tripId: number): Observable<any> {
    return this.http.post(
      `${API_URL}/users/${userId}/trips/${tripId}/request_approval`,
      {}
    );
  }
}
