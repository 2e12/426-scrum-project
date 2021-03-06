import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import {MultiFileUploadComponent} from '../file/multi-file-upload/multi-file-upload.component';
import {InsertProductComponent} from '../products/insert-product/insert-product.component';
import {FileUploadModule} from "ng2-file-upload";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    ReactiveFormsModule,
    FileUploadModule
  ],
  declarations: [HomePage, InsertProductComponent, MultiFileUploadComponent]
})
export class HomePageModule {}
