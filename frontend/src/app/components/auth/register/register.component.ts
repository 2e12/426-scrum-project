import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { UserService } from '../../../service/user.service';
import { Router } from '@angular/router';
import User from '../../../models/user';
import {throwError} from 'rxjs';
import {ToastController} from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  registerFormGroup = this.formBuilder.group({
    username: this.formBuilder.control('', [Validators.required]),
    email: this.formBuilder.control('', [Validators.email]),
    password: this.formBuilder.control('', [Validators.required, Validators.pattern('^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$')])
  });

  error: HttpErrorResponse;

  constructor(private userService: UserService,
              private formBuilder: FormBuilder,
              private router: Router,
              private toastController: ToastController) {
  }

  register() {
    const userToBeRegistered = new User();
    userToBeRegistered.password = this.registerFormGroup.get('password').value;
    userToBeRegistered.username = this.registerFormGroup.get('username').value;
    userToBeRegistered.email = this.registerFormGroup.get('email').value;
    this.userService
        .registerUser(userToBeRegistered)
        .subscribe(
            async user => {
                console.log(user);
                this.userService.setUser(user as User);
                await this.router.navigateByUrl('/');
              },
            async error => {
              await this.handleError(error);
            }
        );
  }

  async handleError(error: HttpErrorResponse) {
    const toast = await this.toastController.create({
      message: error.error.detail,
      duration: 2000
    });
    await toast.present();
    return throwError(
        'Something bad happened; please try again later.');
  }
}
