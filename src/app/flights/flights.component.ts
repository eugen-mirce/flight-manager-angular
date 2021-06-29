import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenStorageService } from '../_services/token-storage.service';
import { AdminService } from '../_services/admin.service';
import { FlightService } from '../_services/flight.service';
import { Flight } from '../_models/flight';

@Component({
  selector: 'app-flights',
  templateUrl: './flights.component.html',
  styleUrls: ['./flights.component.css']
})
export class FlightsComponent implements OnInit {
  flights?: Flight[];
  tripId?: number;

  isAdmin: boolean = false;

  constructor(
    private flightService: FlightService,
    private tokenStorageService: TokenStorageService,
    private router: Router,
    private route: ActivatedRoute,
    private adminService: AdminService
  ) {}

  ngOnInit(): void {
    let user = this.tokenStorageService.getUser();
    if (user) {
      if (user.roles.includes('ADMIN')) this.isAdmin = true;
      this.tripId = this.route.snapshot.params.id;
      this.getFlights();
    } else this.router.navigate(['/login']);
  }

  getFlights(): void {
    if (this.isAdmin) {
      this.adminService.getAllFlights().subscribe(
        data => {
          console.log(data);
          this.flights = data;
        },
        error => {
          console.log(error);
        }
      );
    } else {
      let user = this.tokenStorageService.getUser();
      this.flightService.getAll(user.id, this.tripId).subscribe(
        data => {
          console.log(data);
          this.flights = data;
        },
        error => {
          console.log(error);
        }
      );
    }
  }

  removeFlight(flight: any): void {
    if (this.isAdmin) {
      this.adminService.deleteFlight(flight.id).subscribe(
        data => {
          this.getFlights();
        },
        error => {
          console.log(error);
        }
      );
    } else {
      let user = this.tokenStorageService.getUser();
      this.flightService.delete(user.id, this.tripId, flight.id).subscribe(
        data => {
          this.getFlights();
        },
        error => {
          console.log(error);
        }
      );
    }
  }
}
