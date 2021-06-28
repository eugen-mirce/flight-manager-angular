import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from '../login/login.component';
import { HomeComponent } from '../home/home.component';
import { ProfileComponent } from '../profile/profile.component';
import { TripsComponent } from '../trips/trips.component';
import { TripComponent } from '../trips/trip-details.component';
import { AddTripComponent } from '../trips/add-trip.component';
import { FlightsComponent } from '../flights/flights.component';
import { FlightComponent } from '../flights/flight-details.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'profile', component: ProfileComponent }, //Profile
  { path: 'login', component: LoginComponent }, //Login
  { path: 'trips', component: TripsComponent }, //Get User Trips Or All Trips If Admin
  { path: 'trips/:id', component: TripComponent }, //Get Trip Details
  { path: 'trips/:id/flights', component: FlightsComponent }, //Get Trip Flights
  { path: 'add_trip', component: AddTripComponent }, //Add Flight [User]
  { path: 'flights', component: FlightsComponent }, //Get All Flights [Admin Only]
  { path: 'flights/:fid', component: FlightComponent }, //Get Flight Details [Admin Only]
  { path: 'trips/:id/flights/:fid', component: FlightComponent }, //Get Flight Details [User]
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
