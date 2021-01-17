import { Injectable } from '@angular/core';
import BaseService from './base-service';
import { HttpClient } from '@angular/common/http';
import Product from '../models/product';
import User from '../models/user';
import { Observable } from 'rxjs';
import Category from '../models/category';

@Injectable({
  providedIn: 'root'
})
export class ProductService extends BaseService {

  constructor(private http: HttpClient) {
    super();
  }

  createProduct(user: User, name: string, price: string, description: string, category: string) {
    return this.http.post<Product>(this.ROOT_URL + 'products/', {
      name,
      value: price,
      seller: {
        username: user.username,
        email: user.email,
        id: user.id
      },
      description,
      categories: [
        {
          name: category
        }
      ],
      images: []
    }, this.getHttpHeaders(user));
  }

  getProducts(user: User) {
    return this.http.get<Product[]>(this.ROOT_URL + 'products/?skip=0&limit=100', this.getHttpHeaders(user));
  }

  getProductById(id: number) {

  }

  getAllCategories(user: User): Observable<[Category]> {
    return this.http.get<[Category]>(this.ROOT_URL + 'products/categories?skip=0&limit=100', this.getHttpHeaders(user));
  }

  buyProduct(user: User, product: Product) {
    return this.http.post<Product>(this.ROOT_URL + `products/${product.id}/buy`, {
      name: product.name,
      value: product.value,
      seller: {
        username: product.seller.username,
        email: product.seller.email,
        id: product.seller.id
      },
      description: product.description,
      categories: product.categories,
      buyer: {
        username: user.username,
        email: user.email,
        id: user.id
      }

    }, this.getHttpHeaders(user));
  }

}
