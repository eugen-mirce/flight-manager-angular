import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../_services/admin.service';
import { TokenStorageService } from '../_services/token-storage.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  constructor(
    private tokenStorageService: TokenStorageService,
    private router: Router
  ) {}

  ngOnInit() {
    let user = this.tokenStorageService.getUser();
    if (user == null) {
      this.router.navigate['/login'];
    } else if (!user.isAdmin) {
      this.router.navigate[''];
    } else {
    }
  }
}
