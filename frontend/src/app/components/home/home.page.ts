import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../service/product.service';
import Product from '../../models/product';
import { UserService } from '../../service/user.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  products: Product[];

  constructor(private productService: ProductService,
              private userService: UserService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.productService.getProducts(this.userService.getUser()).subscribe(products => {
      this.products = products;
    });
  }

  async logout() {
      localStorage.clear();
      await this.router.navigateByUrl('login-facade');
  }
}
