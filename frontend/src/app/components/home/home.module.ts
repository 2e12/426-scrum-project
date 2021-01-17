import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { MultiFileUploadComponent } from '../file/multi-file-upload/multi-file-upload.component';
import { InsertProductComponent } from '../products/insert-product/insert-product.component';
import { FileUploadModule } from 'ng2-file-upload';
import { CategorySelectComponent } from '../products/insert-product/category-select/category-select.component';
import { PreviewComponent } from '../products/preview/preview.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    ReactiveFormsModule,
    FileUploadModule
  ],
  declarations: [HomePage, InsertProductComponent, MultiFileUploadComponent, PreviewComponent, CategorySelectComponent]
})
export class HomePageModule {}
