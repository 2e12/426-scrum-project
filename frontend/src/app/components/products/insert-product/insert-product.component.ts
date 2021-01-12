import { Component, OnInit, ViewChild } from '@angular/core';
import { MultiFileUploadComponent } from '../../file/multi-file-upload/multi-file-upload.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../../../service/product.service';
import { UserService } from '../../../service/user.service';
import { Router } from '@angular/router';

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
    category: this.formBuilder.control('Nicht Zuweisbar', [Validators.required])
  });

  categories = ['Auto', 'Kleidung', 'Mobiliar', 'Sammlerstücke', 'Nicht Zuweisbar'];

  constructor(private formBuilder: FormBuilder,
              private productService: ProductService,
              private userService: UserService,
              private router: Router) {
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
    ).then(() => this.router.navigateByUrl('/'));
  }
}
