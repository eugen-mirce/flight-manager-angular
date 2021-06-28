import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from '../_services/token-storage.service';
import { TripService } from '../_services/trip.service';
import { Trip } from '../_models/trip';
import { AdminService } from '../_services/admin.service';

@Component({
  selector: 'app-trips',
  templateUrl: './trips.component.html',
  styleUrls: ['./trips.component.css']
})
export class TripsComponent implements OnInit {
  trips?: Trip[];

  isAdmin: boolean = false;

  constructor(
    private tripService: TripService,
    private tokenStorageService: TokenStorageService,
    private router: Router,
    private adminService: AdminService
  ) {}

  ngOnInit(): void {
    let user = this.tokenStorageService.getUser();
    if (user) {
      if (user.roles.includes('ADMIN')) this.isAdmin = true;
      this.getTrips();
    } else this.router.navigate(['/login']);
  }

  getTrips(): void {
    if (this.isAdmin) {
      this.adminService.getAllTrips().subscribe(
        data => {
          console.log(data);
          this.trips = data;
        },
        error => {
          console.log(error);
        }
      );
    } else {
      let user = this.tokenStorageService.getUser();
      this.tripService.getAll(user.id).subscribe(
        data => {
          console.log(data);
          this.trips = data;
        },
        error => {
          console.log(error);
        }
      );
    }
  }

  removeTrip(trip: any): void {
    if (this.isAdmin) {
      this.adminService.deleteTrip(trip.id).subscribe(
        data => {
          this.getTrips();
        },
        error => {
          console.log(error);
        }
      );
    } else {
      let user = this.tokenStorageService.getUser();
      this.tripService.delete(user.id, trip.id).subscribe(
        data => {
          this.getTrips();
        },
        error => {
          console.log(error);
        }
      );
    }
  }
}
