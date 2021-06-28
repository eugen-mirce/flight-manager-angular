import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { API_URL } from '../shared/constants';
import { Trip } from '../_models/trip';
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

  getAllTrips(): Observable<Trip[]> {
    return this.http.get<Trip[]>(`${API_URL}/trips`);
  }
  getTrip(tripId: number): Observable<Trip> {
    return this.http.get<Trip>(`${API_URL}/trips/${tripId}`);
  }
  updateTrip(tripId: number, data: any): Observable<any> {
    return this.http.put(`${API_URL}/trips/${tripId}`, data);
  }
  deleteTrip(tripId: number): Observable<any> {
    return this.http.delete(`${API_URL}/trips/${tripId}`, {
      responseType: 'text'
    });
  }
}
