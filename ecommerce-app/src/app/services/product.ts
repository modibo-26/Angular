import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable, switchMap } from 'rxjs';
import { Product } from '../models/products';

@Injectable({
  providedIn: 'root',
})
export class ProductService {

  private http = inject(HttpClient)

  private apiUrl = `http://localhost:3000/products`;

  constructor() {}

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }

  getProducts(page: number, limit: number): Observable<Product[]> {
      return this.http.get<Product[]>(`${this.apiUrl}?_page=${page}&_limit=${limit}`);
  }

  getProductById(productId: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${productId}`);
  }

  getProductsByCategory(category: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}?category=${category}`);
  }
  
  getByFilter(filter: string, products: Observable<Product[]>): Observable<Product[]> {
    return products.pipe(
      map(products => products.filter(p => 
        p.name.toLowerCase().includes(filter.toLowerCase())
      ))
    );
  }

  paginate(products$: Observable<Product[]>, page: number, limit: number): Observable<Product[]> {
    return products$.pipe(
      map(products => {
        const start = (page - 1) * limit;
        return products.slice(start, start + limit);
      })
    );
  }

  updateStock(productId: number, delta: number): Observable<Product> {
    const product = this.getProductById(productId);
    return product.pipe(
      map(product => ({
        ...product,
        stock: product.stock + delta
      })),
      switchMap(updatedProduct => this.http.patch<Product>(`${this.apiUrl}/${productId}`, updatedProduct))
    )
  }

}
