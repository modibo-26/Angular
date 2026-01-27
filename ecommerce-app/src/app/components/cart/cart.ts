import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../services/cart';
import { CartItem } from '../../models/cart';
import { combineLatest, map, Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { ProductService } from '../../services/product';
import { Product } from '../../models/products';
import { OrderService } from '../../services/order';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-cart',
  imports: [
    AsyncPipe,
    MatCardModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './cart.html',
  styleUrl: './cart.scss',
})
export class CartComponent implements OnInit {

  private router = inject(Router);

  private service = inject(CartService);

  private productService = inject(ProductService)

  private orderService = inject(OrderService)

  private cdr = inject(ChangeDetectorRef);

  private auth = inject(AuthService)

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

  increment(item: CartItem){
    this.service.addToCart(item.productId, 1).subscribe(() => {
      this.loadCart();
      this.cdr.detectChanges();
    });
  }

  decrement(id: number){
    this.service.decrementCard(id).subscribe(() => {
      this.loadCart();
      this.cdr.detectChanges();
    });
  }

  validCart(cart: CartItem[], total: number) {
    this.orderService.createOrder(cart, total).subscribe(() => {
      this.clearCart(cart).subscribe(()=> {
        this.router.navigateByUrl('order-history')
      })
    })
  }

  clearCart(carts: CartItem[]): Observable<void[]> {
    return this.service.clearCart(carts)
  }

}
