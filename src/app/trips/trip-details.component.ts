import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenStorageService } from '../_services/token-storage.service';
import { TripService } from '../_services/trip.service';
import { AdminService } from '../_services/admin.service';
import { Trip } from '../_models/trip';
import { Flight } from '../_models/flight';
import { REASONS, STATUSES } from '../shared/constants';

@Component({
  selector: 'trip-details',
  templateUrl: './trip-details.component.html',
  styleUrls: ['./trip-details.component.css']
})
export class TripComponent implements OnInit {
  userId: number;
  isAdmin: boolean = false;
  reasons: string[] = REASONS;
  statuses: string[] = STATUSES;

  currentTrip: Trip = {
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
  message = '';

  constructor(
    private tripService: TripService,
    private tokenStorageService: TokenStorageService,
    private adminService: AdminService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    let user = this.tokenStorageService.getUser();
    if (user) {
      if (user.roles.includes('ADMIN')) this.isAdmin = true;
      this.userId = this.tokenStorageService.getUser().id;
      let tripId = this.route.snapshot.params.id;
      this.getTrip(tripId);
    } else this.router.navigate(['/login']);
  }

  getTrip(id: number): void {
    if (this.isAdmin)
      this.adminService.getTrip(id).subscribe(
        data => {
          console.log(data);
          this.currentTrip = data;
        },
        error => {
          console.log(error);
        }
      );
    else {
      this.tripService.get(this.userId, id).subscribe(
        data => {
          console.log(data);
          this.currentTrip = data;
        },
        error => {
          console.log(error);
        }
      );
    }
  }

  updateTrip(): void {
    this.message = '';

    if (this.isAdmin)
      this.adminService
        .updateTrip(this.currentTrip.id, this.currentTrip)
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
      this.tripService
        .update(this.userId, this.currentTrip.id, this.currentTrip)
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

  deleteTrip(): void {
    if (this.isAdmin)
      this.tripService.delete(this.userId, this.currentTrip.id).subscribe(
        response => {
          console.log(response);
          this.router.navigate(['/trips']);
        },
        error => {
          console.log(error);
        }
      );
    else
      this.adminService.deleteTrip(this.currentTrip.id).subscribe(
        response => {
          this.router.navigate(['/trips']);
        },
        error => {
          console.log(error);
        }
      );
  }

  requestApproval(): void {
    this.tripService
      .requestApproval(this.userId, this.currentTrip.id)
      .subscribe(
        response => {
          this.getTrip(this.currentTrip.id);
        },
        error => {
          console.log(error);
        }
      );
  }
}
