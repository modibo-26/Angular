import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Product } from '../models/products';

@Injectable({
  providedIn: 'root',
})
export class ProductService {

  private http = inject(HttpClient)

  private apiUrl = 'http://localhost:3000/products';

  constructor() {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }

  getProductById(productId: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${productId}`);
  }

  getProductsByCategory(category: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}?category=${category}`);
  }

  // getByFilter(filter: string): Observable<Product[]> {
  //   return this.http.get<Product[]>(`${this.apiUrl}product?name_like=${filter}`)
  // }
  
  getByFilter(filter: string): Observable<Product[]> {
  return this.http.get<Product[]>(this.apiUrl).pipe(
    map(products => products.filter(p => 
      p.name.toLowerCase().includes(filter.toLowerCase())
    ))
  );
}

}
