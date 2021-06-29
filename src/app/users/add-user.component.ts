import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../_services/admin.service';
import { TokenStorageService } from '../_services/token-storage.service';

@Component({
  selector: 'add-user',
  templateUrl: 'add-user.component.html',
  styleUrls: ['add-user.component.css']
})
export class AddUserComponent implements OnInit {
  newUser: any = {
    id: null,
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  };

  message: string;

  constructor(
    private tokenStorageService: TokenStorageService,
    private adminService: AdminService,
    private router: Router
  ) {}
  ngOnInit(): void {
    let user = this.tokenStorageService.getUser();
    if (!user.roles.includes('ADMIN')) this.router.navigate(['']);
  }
  addUser(): void {
    this.message = '';

    this.adminService.createUser(this.newUser).subscribe(
      response => {
        this.message = response.message
          ? response.message
          : 'This user was updated successfully!';

        this.router.navigate(['/profile/' + response.id]);
      },
      error => {
        console.log(error);
      }
    );
  }
}
