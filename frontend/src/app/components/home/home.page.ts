import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../service/product.service';
import Product from '../../models/product';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  products: Product[];

  constructor(private productService: ProductService,
              private userService: UserService) {
  }

  ngOnInit(): void {
    this.productService.getProducts(this.userService.getUser()).subscribe(products => {
      this.products = products;
    });
  }
}
