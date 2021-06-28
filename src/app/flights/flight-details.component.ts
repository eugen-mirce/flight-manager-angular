import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenStorageService } from '../_services/token-storage.service';
import { AdminService } from '../_services/admin.service';
import { Flight } from '../_models/flight';
import { FlightService } from '../_services/flight.service';

@Component({
  selector: 'app-flight-details',
  templateUrl: './flight-details.component.html',
  styleUrls: ['./flight-details.component.css']
})
export class FlightComponent implements OnInit {
  userId?: number;
  tripId?: number;
  isAdmin: boolean = false;

  currentFlight: Flight = {
    id: null,
    from: '',
    to: '',
    departureDate: '',
    arrivalDate: ''
  };

  message = '';

  constructor(
    private flightService: FlightService,
    private tokenStorageService: TokenStorageService,
    private adminService: AdminService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    let user = this.tokenStorageService.getUser();
    if (user) {
      if (user.roles.includes('ADMIN')) this.isAdmin = true;
      else this.tripId = this.route.snapshot.params.id;

      this.userId = this.tokenStorageService.getUser().id;

      let flightId = this.route.snapshot.params.fid;
      this.getFlight(flightId);
    } else this.router.navigate(['/login']);
  }

  getFlight(id: number): void {
    if (this.isAdmin)
      this.adminService.getFlight(id).subscribe(
        data => {
          console.log(data);
          this.currentFlight = data;
        },
        error => {
          console.log(error);
        }
      );
    else {
      this.flightService.get(this.userId, this.tripId, id).subscribe(
        data => {
          console.log(data);
          this.currentFlight = data;
        },
        error => {
          console.log(error);
        }
      );
    }
  }

  updateFlight(): void {
    this.message = '';

    if (this.isAdmin)
      this.adminService
        .updateFlight(this.currentFlight.id, this.currentFlight)
        .subscribe(
          response => {
            console.log(response);
            this.message = response.message
              ? response.message
              : 'This trip was updated successfully!';
          },
          error => {
            console.log(error);
          }
        );
    else
      this.flightService
        .update(
          this.userId,
          this.tripId,
          this.currentFlight.id,
          this.currentFlight
        )
        .subscribe(
          response => {
            console.log(response);
            this.message = response.message
              ? response.message
              : 'This trip was updated successfully!';
          },
          error => {
            console.log(error);
          }
        );
  }

  deleteFlight(): void {
    if (this.isAdmin)
      this.adminService.deleteFlight(this.currentFlight.id).subscribe(
        response => {
          this.router.navigate(['/flights']);
        },
        error => {
          console.log(error);
        }
      );
    else
      this.flightService
        .delete(this.userId, this.tripId, this.currentFlight.id)
        .subscribe(
          response => {
            console.log(response);
            this.router.navigate(['/trips/{{this.tripId}}/flights']);
          },
          error => {
            console.log(error);
          }
        );
  }
}
