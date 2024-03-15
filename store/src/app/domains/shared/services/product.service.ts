import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { IProduct } from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private http = inject(HttpClient);

  constructor() {}

  getProducts(categoryId?: string) {
    const url = new URL(`https://api.escuelajs.co/api/v1/products`);

    if (categoryId) {
      url.searchParams.set('categoryId', categoryId);
    }

    return this.http.get<IProduct[]>(url.toString());
  }

  getProductById(id: string) {
    return this.http.get<IProduct>(
      `https://api.escuelajs.co/api/v1/products/${id}`
    );
  }
}
