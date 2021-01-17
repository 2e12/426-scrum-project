import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { ToastController } from '@ionic/angular';
import { Injectable } from '@angular/core';

@Injectable()
export class ErrorController {
  constructor(private toastController: ToastController) {
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
