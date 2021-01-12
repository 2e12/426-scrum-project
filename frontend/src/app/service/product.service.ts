import { Injectable } from '@angular/core';
import BaseService from './base-service';
import { HttpClient } from '@angular/common/http';
import Product from '../models/product';
import User from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class ProductService extends BaseService {

  constructor(private http: HttpClient) {
    super();
  }

  async createProduct(user: User, name: string, price: string, description: string, category: string) {
    return this.http.post<Product>(this.ROOT_URL + 'products', {
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
          name: category,
          id: 0
        }
      ]
    }, this.getHttpHeaders(user)).subscribe();
  }

  getProducts(user: User){
    return this.http.get<Product[]>(this.ROOT_URL + 'products/?skip=0&limit=100', this.getHttpHeaders(user));
  }

  getProductById(id: number){

  }
}
