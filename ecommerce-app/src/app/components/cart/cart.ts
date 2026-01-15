import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../services/cart';
import { CartItem } from '../../models/cart';
import { combineLatest, map, Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { ProductService } from '../../services/product';
import { Product } from '../../models/products';

@Component({
  selector: 'app-cart',
  imports: [
    AsyncPipe,
  ],
  templateUrl: './cart.html',
  styleUrl: './cart.scss',
})
export class CartComponent implements OnInit {

  private service = inject(CartService);

  private productService = inject(ProductService)

  private cdr = inject(ChangeDetectorRef);


  cart$!: Observable<CartItem[]>
  products$!: Observable<Product[]>
  total$!: Observable<number>


  ngOnInit() {
    this.loadCart()
  }

  getProduct(products: Product[], productId: number): Product | undefined {
    return products.find(p => p.id === productId);
  }

  loadCart() {
    this.products$ = this.productService.getAllProducts();
    this.cart$ = this.service.getCart();
    this.total$ = combineLatest([this.cart$, this.products$]).pipe(
      map(([cart, products]) => {
        return cart.reduce((sum, item) => {
          const product = products.find(p => p.id == item.productId);
          return sum + (product ? product.price * item.quantity : 0);
        }, 0);
      })
    );
  }

  removeFromCart(id: number) {
    this.service.removeFromCart(id).subscribe(() => {
      this.loadCart();
      this.cdr.detectChanges();
    });
  }

}
