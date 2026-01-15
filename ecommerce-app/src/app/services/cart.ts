import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable, switchMap } from 'rxjs';
import { CartItem } from '../models/cart';
import { ProductService } from './product';

@Injectable({
  providedIn: 'root',
})
export class CartService {

  private http = inject(HttpClient)

  private productService = inject(ProductService);

  private apiUrl = `http://localhost:3000/cart`;

  
  
  getCart(): Observable<CartItem[]> {
    return this.http.get<CartItem[]>(this.apiUrl);
  }

  getCartItem(id: number): Observable<CartItem> {
    return this.http.get<CartItem>(`${this.apiUrl}/${id}`);
  }

  addToCart(productId: number, quantity: number): Observable<CartItem> {
    return this.getCart().pipe(
      switchMap(cart => {
        const existingItem = cart.find(item => item.productId === productId);
        
        if (existingItem) {
          // Produit existe → mettre à jour la quantité
          return this.updateQuantity(existingItem.id, existingItem.quantity + quantity).pipe(
            switchMap(() => this.productService.updateStock(productId, -quantity)),
            map(() => existingItem)
          );
        } else {
          // Nouveau produit → vérifier stock et ajouter
          return this.productService.getProductById(productId).pipe(
            switchMap(product => {
              if (product.stock < quantity) {
                throw new Error('Stock insuffisant');
              }
              return this.http.post<CartItem>(this.apiUrl, { productId, quantity });
            }),
            switchMap(cartItem => {
              return this.productService.updateStock(productId, -quantity).pipe(
                map(() => cartItem)
              );
            })
          );
        }
      })
    );
  }

  removeFromCart(id: number): Observable<void> {
    return this.getCartItem(id).pipe(
      switchMap(item => {
        return this.productService.updateStock(item.productId, item.quantity).pipe(
          switchMap(() => this.http.delete<void>(`${this.apiUrl}/${id}`))
        );
      })
    );
  }

  updateQuantity(id: number, quantity: number): Observable<CartItem> {
    return this.http.patch<CartItem>(`${this.apiUrl}/${id}`, { quantity });
  }

  

}
