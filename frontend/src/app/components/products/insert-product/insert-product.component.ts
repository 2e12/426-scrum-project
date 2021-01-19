import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../../../services/product.service';
import { UserService } from '../../../services/user.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { MessageController } from '../../../controllers/message-controller.service';

@Component({
  selector: 'app-insert-product',
  templateUrl: './insert-product.component.html',
  styleUrls: ['./insert-product.component.scss'],
})
export class InsertProductComponent implements OnInit {

  productFormGroup: FormGroup = this.formBuilder.group({
    name: this.formBuilder.control('', [Validators.required]),
    price: this.formBuilder.control('', [Validators.required, Validators.pattern('^\\d+(,\\d{1,2})?$')]),
    description: this.formBuilder.control('', [Validators.required]),
    category: this.formBuilder.control('', [Validators.required])
  });

  files: FileList;

  constructor(private formBuilder: FormBuilder,
              private productService: ProductService,
              private userService: UserService,
              private router: Router,
              private alertController: AlertController,
              private messageController: MessageController) {
  }

  ngOnInit() {
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
        await this.messageController.handleError(error);
      }
    );
  }

  setCategory(category: string) {
    this.productFormGroup.get('category').patchValue(category);
  }

  onFilesChanged(event: Event) {
    this.files = (event.target as HTMLInputElement).files;
    this.productService.postImages(this.userService.getUser(), this.files).subscribe(image => {
      console.log(image);
    }, async error => {
      console.log(error);
      await this.messageController.handleError(error);
    });
  }

  overMaxAllowedFiles() {
    if (this.files === undefined) {
      return false;
    }
    return this.files.length > 5;
  }
}
