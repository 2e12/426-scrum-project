import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../../service/user.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import User from '../../../models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginFormGroup = this.formBuilder.group({
    username: this.formBuilder.control('', [Validators.required]),
    password: this.formBuilder.control('', [Validators.required])
  });

  error: HttpErrorResponse;

  constructor(private userService: UserService,
              private formBuilder: FormBuilder,
              private router: Router) {
  }

  login() {
    this.userService.authenticateUser(this.userService.newUser(
      this.loginFormGroup.get('username').value,
      this.loginFormGroup.get('password').value
    )).subscribe((user: User) => {
      this.userService.setUser(user);
      this.router.navigateByUrl('/');
    }, error => {
      this.error = error;
    });
  }
}
