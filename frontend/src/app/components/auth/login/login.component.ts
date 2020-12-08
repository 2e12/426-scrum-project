import {Component} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {UserService} from "../../../service/user.service";
import {Router} from "@angular/router";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginFormGroup = this._formBuilder.group({
    username: this._formBuilder.control('', [Validators.required]),
    password: this._formBuilder.control('', [Validators.required])
  });

  error: HttpErrorResponse;

  constructor(private userService: UserService,
              private _formBuilder: FormBuilder,
              private router: Router) { }

  login(){
    this.userService.authenticateUser(this.loginFormGroup).subscribe(data => {
      this.userService.setUser(data);
      this.router.navigateByUrl('/');
    }, error => {
      this.error = error;
    });
  }
}
