import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { API_URL } from '../shared/constants';
import { Trip } from '../_models/trip';
import { Flight } from '../_models/flight';
import { Observable } from 'rxjs';

const httpOptions = {
  observe: 'response' as 'response',
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  constructor(private http: HttpClient) {}

  getUser(id: number): Observable<any> {
    return this.http.get(`${API_URL}/users/${id}`);
  }
  getUsers(): Observable<any> {
    return this.http.get(`${API_URL}/users`);
  }
  createUser(data: any): Observable<any> {
    return this.http.post(`${API_URL}/users`, data);
  }
  updateUser(id: number, data: any): Observable<any> {
    return this.http.put(`${API_URL}/users/${id}`, data);
  }
  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${API_URL}/users/${id}`, { responseType: 'text' });
  }

  getAllTrips(selector: string): Observable<Trip[]> {
    return this.http.get<Trip[]>(`${API_URL}/trips?status=${selector}`);
  }
  getTrip(tripId: number): Observable<Trip> {
    return this.http.get<Trip>(`${API_URL}/trips/${tripId}`);
  }
  approveTrip(tripId: number): Observable<any> {
    return this.http.put(`${API_URL}/trips/${tripId}/status/approved`, {});
  }
  updateTrip(tripId: number, data: any): Observable<any> {
    return this.http.put(`${API_URL}/trips/${tripId}`, data);
  }
  deleteTrip(tripId: number): Observable<any> {
    return this.http.delete(`${API_URL}/trips/${tripId}`, {
      responseType: 'text'
    });
  }
  getAllFlights(): Observable<Flight[]> {
    return this.http.get<Flight[]>(`${API_URL}/flights`);
  }
  getFlight(flightId: number): Observable<Flight> {
    return this.http.get<Flight>(`${API_URL}/flights/${flightId}`);
  }
  updateFlight(flightId: number, data: any): Observable<any> {
    return this.http.put(`${API_URL}/flights/${flightId}`, data);
  }
  deleteFlight(flightId: number): Observable<any> {
    return this.http.delete(`${API_URL}/flights/${flightId}`, {
      responseType: 'text'
    });
  }
}
