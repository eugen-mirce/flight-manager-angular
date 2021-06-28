import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { UserService } from '../_services/user.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: any = {
    email: null,
    password: null
  };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];

  constructor(
    private authService: AuthService,
    private tokenStorage: TokenStorageService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
      this.router.navigate(['/']);
    }
  }

  onSubmit(): void {
    const { email, password } = this.form;

    this.authService.login(email, password).subscribe(
      (data: any) => {
        const token = data.headers.get('authorization');
        const admin = data.headers.get('isadmin');
        const user_id = data.headers.get('userid');
        this.tokenStorage.saveToken(token);

        this.saveUser(user_id, admin);
      },
      err => {
        if (err.status == 403) {
          this.errorMessage = 'Wrong Credentials.';
        } else {
          this.errorMessage = err.error.message;
        }
        this.isLoginFailed = true;
      }
    );
  }

  reloadPage(): void {
    window.location.reload();
  }

  saveUser(id: number, admin: string): void {
    this.userService.getUserInfo(id).subscribe((data: any) => {
      console.log(admin);
      if (admin == 'true') data.roles = 'ADMIN';
      else data.roles = 'USER';
      this.tokenStorage.saveUser(data);

      this.isLoginFailed = false;
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
      this.reloadPage();
    });
  }
}
