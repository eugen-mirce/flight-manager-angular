import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing/app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { TripsComponent } from './trips/trips.component';
import { TripComponent } from './trips/trip-details.component';

import { authInterceptorProviders } from './_helpers/auth.interceptor';
import { AddTripComponent } from './trips/add-trip.component';
import { FlightsComponent } from './flights/flights.component';
import { FlightComponent } from './flights/flight-details.component';

@NgModule({
  imports: [BrowserModule, FormsModule, HttpClientModule, AppRoutingModule],
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    ProfileComponent,
    TripsComponent,
    TripComponent,
    AddTripComponent,
    FlightsComponent,
    FlightComponent
  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule {}
