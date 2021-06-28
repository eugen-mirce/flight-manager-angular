import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../_services/token-storage.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  currentUser: any;

  constructor(private tokenService: TokenStorageService) {}

  ngOnInit(): void {
    this.currentUser = this.tokenService.getUser();
    if (Object.keys(this.currentUser).length === 0) {
      this.currentUser = null;
    }
  }
}
