import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product';
import { map, Observable } from 'rxjs';
import { Product } from '../../models/products';
import { AsyncPipe } from '@angular/common';
import { ProductComponent } from '../product/product';

@Component({
  selector: 'app-product-list',
  imports: [AsyncPipe, ProductComponent],
  templateUrl: './product-list.html',
  styleUrl: './product-list.scss',
})
export class ProductList implements OnInit {


  products$!: Observable<Product[]>;
  categories$!: Observable<string[]>;
  filter: string= '';


  constructor(private service: ProductService) {}

  ngOnInit() {
    this.products$ = this.getProduct();
    this.categories$ = this.products$.pipe(
      map(products => [...new Set(products.map(p => p.category))])
  );
    
  }

  getProduct() {
   return this.service.getProducts();
  }

  getByCategory(category: string) {
    this.products$ = this.service.getProductsByCategory(category);
  }

  getFilter(filter: string) {
    console.log('Recherche:', filter);
    this.products$ = this.service.getByFilter(filter);
  }

  

}
