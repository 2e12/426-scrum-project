import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import Product from '../../models/product';
import { UserService } from '../../service/user.service';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import Category from '../../models/category';
import { ModalController } from '@ionic/angular';
import { PreviewComponent } from '../products/preview/preview.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  private products: Product[];
  filteredProducts: Product[];
  searchControl = this.formBuilder.control('');
  categories: Category[];

  constructor(private productService: ProductService,
              private userService: UserService,
              private router: Router,
              private formBuilder: FormBuilder,
              private modalController: ModalController) {
  }

  ngOnInit(): void {
    this.productService.getProducts(this.userService.getUser()).subscribe(products => {
      this.products = products;
      this.filteredProducts = products;
    });

    this.productService.getAllCategories(this.userService.getUser()).subscribe((categories: Category[]) => {
      this.categories = categories;
    });

    this.searchControl.valueChanges.subscribe(text => {
      if (text === '' || text === null) {
        this.filteredProducts = this.products;
        return;
      }
      this.filteredProducts = this.products.filter(product => product.name.includes(text) || product.categories[0].name.includes(text));
    });
  }

  async logout() {
    localStorage.clear();
    await this.router.navigateByUrl('login-facade');
  }

  async openProductPreview(product: Product) {
    const modal = await this.modalController.create({
      component: PreviewComponent,
      componentProps: {
        product
      }
    });

    return await modal.present();
  }
}
