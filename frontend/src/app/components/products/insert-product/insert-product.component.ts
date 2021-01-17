import { Component, OnInit, ViewChild } from '@angular/core';
import { MultiFileUploadComponent } from '../../file/multi-file-upload/multi-file-upload.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../../../services/product.service';
import { UserService } from '../../../services/user.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ErrorController } from '../../../controllers/error-controller';

@Component({
  selector: 'app-insert-product',
  templateUrl: './insert-product.component.html',
  styleUrls: ['./insert-product.component.scss'],
})
export class InsertProductComponent implements OnInit {
  @ViewChild(MultiFileUploadComponent) fileField: MultiFileUploadComponent;
  productFormGroup: FormGroup = this.formBuilder.group({
    name: this.formBuilder.control('', [Validators.required]),
    price: this.formBuilder.control('', [Validators.required, Validators.pattern('^\\d+(,\\d{1,2})?$')]),
    description: this.formBuilder.control('', [Validators.required]),
    category: this.formBuilder.control('', [Validators.required])
  });

  constructor(private formBuilder: FormBuilder,
              private productService: ProductService,
              private userService: UserService,
              private router: Router,
              private alertController: AlertController,
              private errorController: ErrorController) {
  }

  ngOnInit() {
  }

  upload() {
    const files = this.fileField.getFiles();
    const formData = new FormData();

    formData.append('somekey', 'some value'); // Add any other data you want to send

    files.forEach((file) => {
      formData.append('files[]', file.rawFile, file.name);
    });

    // POST formData to Server
  }

  async submitProduct() {
    await this.productService.createProduct(
      this.userService.getUser(),
      this.productFormGroup.get('name').value,
      this.productFormGroup.get('price').value,
      this.productFormGroup.get('description').value,
      this.productFormGroup.get('category').value
    ).subscribe(async () => {
        await this.router.navigateByUrl('/');
      },
      async error => {
        await this.errorController.handleError(error);
      }
    );
  }

  setCategory(category: string) {
    this.productFormGroup.get('category').patchValue(category);
    console.log(this.productFormGroup.get('category').value);
  }
}
