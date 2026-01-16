import { Component, inject, OnInit } from '@angular/core';
import { OrderService } from '../../services/order';
import { Order } from '../../models/order';
import { Observable } from 'rxjs';
import { ProductService } from '../../services/product';
import { Product } from '../../models/products';
import { AsyncPipe, DatePipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-order-history',
  imports: [
    AsyncPipe,
    DatePipe,
    MatCardModule
  ],
  templateUrl: './order-history.html',
  styleUrl: './order-history.scss',
})
export class OrderHistory implements OnInit {
  orders$!: Observable<Order[]>
  products$!: Observable<Product[]>

  private orderService = inject(OrderService)

  private productService = inject(ProductService)

  ngOnInit(): void {
    this.orders$ = this.orderService.getOrder()
    this.products$ = this.productService.getAllProducts();
  }

  getProduct(products: Product[], productId: number): Product | undefined {
    return products.find(p => p.id === productId);
  }

}
