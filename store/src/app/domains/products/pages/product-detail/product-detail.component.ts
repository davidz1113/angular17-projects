import { CurrencyPipe } from '@angular/common';
import { Component, Input, OnInit, inject, signal } from '@angular/core';
import { IProduct } from '@shared/models/product.model';
import { CartService } from '@shared/services/cart.service';
import { ProductService } from '@shared/services/product.service';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css',
})
export default class ProductDetailComponent implements OnInit {
  @Input() id?: string;

  product = signal<IProduct | null>(null);
  imageDefault = signal<string>('');

  private productService = inject(ProductService);
  private cartService = inject(CartService);

  ngOnInit(): void {
    if (this.id) {
      this.productService.getProductById(this.id).subscribe({
        next: (product) => {
          this.product.set(product);
          if (product.images.length > 0) {
            this.imageDefault.set(product.images[0]);
          }
        },
        error: () => {},
      });
    }
  }

  changeDefaultImage(newImage: string) {
    this.imageDefault.set(newImage);
  }

  btnAddToCart() {
    const product = this.product();
    if (product) {
      this.cartService.addToCart(product);
    }
  }
}
