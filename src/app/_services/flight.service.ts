import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL } from '../shared/constants';
import { Flight } from '../_models/flight';

@Injectable({
  providedIn: 'root'
})
export class FlightService {
  constructor(private http: HttpClient) {}

  getAll(userId: number, tripId: number): Observable<Flight[]> {
    return this.http.get<Flight[]>(
      `${API_URL}/users/${userId}/trips/${tripId}/flights/`
    );
  }

  get(userId: number, tripId: number, flightId: number): Observable<Flight> {
    return this.http.get<Flight>(
      `${API_URL}/users/${userId}/trips/${tripId}/flights/${flightId}`
    );
  }
  create(userId: number, tripId: number, data: any): Observable<any> {
    return this.http.post<any>(
      `${API_URL}/users/${userId}/trips/${tripId}/flights`,
      data
    );
  }
  update(
    userId: number,
    tripId: number,
    flightId: number,
    data: any
  ): Observable<any> {
    return this.http.put(
      `${API_URL}/users/${userId}/trips/${tripId}/flights/${flightId}`,
      data
    );
  }
  delete(userId: number, tripId: number, flightId: number): Observable<any> {
    return this.http.delete(
      `${API_URL}/users/${userId}/trips/${tripId}/flights/${flightId}`,
      { responseType: 'text' }
    );
  }
}
