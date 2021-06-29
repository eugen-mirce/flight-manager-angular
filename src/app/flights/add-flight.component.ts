import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Flight } from '../_models/flight';
import { FlightService } from '../_services/flight.service';
import { TokenStorageService } from '../_services/token-storage.service';

@Component({
  selector: 'add-flight',
  templateUrl: './add-flight.component.html',
  styleUrls: ['./add-flight.component.css']
})
export class AddFlightComponent implements OnInit {
  newFlight: Flight = {
    id: null,
    from: '',
    to: '',
    departureDate: '',
    arrivalDate: ''
  };
  userId: number;
  tripId: number;
  message: string = '';

  constructor(
    private tokenStorageService: TokenStorageService,
    private flightService: FlightService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    let user = this.tokenStorageService.getUser();
    if (user) {
      this.userId = user.id;
      this.tripId = this.route.snapshot.params.id;
      if (this.tripId == undefined) this.router.navigate(['/trips/']);
    } else {
      this.router.navigate(['/login']);
    }
  }
  addFlight(): void {
    this.flightService
      .create(this.userId, this.tripId, this.newFlight)
      .subscribe(
        response => {
          this.message = 'Flight Created Successfully';
          this.router.navigate([`/trips/${this.tripId}/flights`]);
        },
        error => {
          this.message = error.error.message;
        }
      );
  }
}
