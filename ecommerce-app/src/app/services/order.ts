import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CartItem } from '../models/cart';
import { AuthService } from './auth';
import { Order } from '../models/order';

@Injectable({
  providedIn: 'root',
})
export class OrderService {

  private http = inject(HttpClient)

  private auth = inject(AuthService)

  private apiUrl = `http://localhost:3000/orders`;


  getOrder() {
    const userId = this.auth.getCurrentUser()?.id;
    return this.http.get<Order[]>(`${this.apiUrl}?userId=${userId}`)
  }

  createOrder(items: CartItem[], total: number): Observable <Order> {
    const createdDate = new Date();
    const userId = this.auth.getCurrentUser()?.id;
    return this.http.post<Order>(this.apiUrl, {items, total, createdDate, userId});
  }

}
