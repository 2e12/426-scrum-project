import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { Router } from '@angular/router';
import User from '../../../models/user';
import { ErrorController } from '../../../controllers/error-controller';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  registerFormGroup = this.formBuilder.group({
    username: this.formBuilder.control('', [Validators.required]),
    email: this.formBuilder.control('', [Validators.email]),
    password: this.formBuilder.control('', [Validators.required, Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).{8,15}$')])
  });

  constructor(private userService: UserService,
              private formBuilder: FormBuilder,
              private router: Router,
              private errorController: ErrorController) {
  }

  register() {
    const userToBeRegistered = new User();
    userToBeRegistered.password = this.registerFormGroup.get('password').value;
    userToBeRegistered.username = this.registerFormGroup.get('username').value;
    userToBeRegistered.email = this.registerFormGroup.get('email').value;
    this.userService.registerUser(userToBeRegistered).subscribe(
      async user => {
        this.userService.setUser(user as User);
        await this.router.navigateByUrl('/');
      },
      async error => {
        await this.errorController.handleError(error);
      }
    );
  }
}
