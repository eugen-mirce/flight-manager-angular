import { Component, OnInit } from '@angular/core';
import { Trip } from '../_models/trip';
import { TokenStorageService } from '../_services/token-storage.service';
import { REASONS } from '../shared/constants';
import { TripService } from '../_services/trip.service';
import { Router } from '@angular/router';
@Component({
  selector: 'add-trip',
  templateUrl: './add-trip.component.html',
  styleUrls: ['./add-trip.component.css']
})
export class AddTripComponent implements OnInit {
  userId: number;
  isLoggedIn: boolean = false;
  newTrip: Trip = {
    id: null,
    reason: '',
    description: '',
    from: '',
    to: '',
    departureDate: '',
    arrivalDate: '',
    flights: [],
    status: ''
  };
  reasons: string[] = REASONS;
  message: string;

  constructor(
    private tokenStorageService: TokenStorageService,
    private tripService: TripService,
    private router: Router
  ) {}

  ngOnInit(): void {
    let user = this.tokenStorageService.getUser();
    if (user) {
      this.userId = user.id;
      this.isLoggedIn = true;
    } else this.router.navigate(['/login']);
  }

  addTrip(): void {
    this.message = '';

    this.tripService.create(this.userId, this.newTrip).subscribe(
      response => {
        this.message = response.message
          ? response.message
          : 'This trip was updated successfully!';

        this.router.navigate(['/trips/' + response.id]);
      },
      error => {
        console.log(error);
      }
    );
  }
}
