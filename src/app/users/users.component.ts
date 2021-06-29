import { error } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../_services/admin.service';
import { TokenStorageService } from '../_services/token-storage.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: any[];

  constructor(
    private tokenStorageService: TokenStorageService,
    private adminService: AdminService,
    private router: Router
  ) {}

  ngOnInit() {
    let user = this.tokenStorageService.getUser();
    if (user.roles.includes('ADMIN')) {
      this.getUsers();
    } else {
      this.router.navigate(['/home']);
    }
  }
  getUsers() {
    this.adminService.getUsers().subscribe(
      response => {
        this.users = response.content;
      },
      error => {
        console.log(error);
      }
    );
  }
  removeUser(user: any) {
    this.adminService.deleteUser(user.id).subscribe(
      response => {
        this.getUsers();
      },
      error => {
        console.log(error);
      }
    );
  }
}
