import { Component, inject, OnInit } from '@angular/core';
import { ProductService } from '../../services/product';
import { map, Observable } from 'rxjs';
import { Product } from '../../models/products';
import { AsyncPipe } from '@angular/common';
import { ProductComponent } from '../product/product';
import { Pagination } from '../pagination/pagination';
import { CartService } from '../../services/cart';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-product-list',
  imports: [
    AsyncPipe, 
    ProductComponent, 
    Pagination,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule
  ],
  templateUrl: './product-list.html',
  styleUrl: './product-list.scss',
})
export class ProductList implements OnInit {


  products$!: Observable<Product[]>;
  categories$!: Observable<string[]>;
  selectedCategory = '';
  filter: string= '';
  currentPage = 1;
  limit = 8;
  totalPages = 1;

  private service = inject(ProductService);

  private cartService = inject(CartService)

  ngOnInit() {
    this.products$ = this.getProduct(this.currentPage, this.limit);
    this.categories$ = this.service.getAllProducts().pipe(
      map(products => [...new Set(products.map(p => p.category))])
    );
    this.service.getAllProducts().pipe(
      map(products => Math.ceil(products.length / this.limit))
    ).subscribe(total => this.totalPages = total);
  }

  getProduct(currentPage: number, limit: number) {
   return this.service.getProducts(currentPage, limit);
  }

  getByCategory(category: string) {
    this.selectedCategory = category;
    this.filterProducts(this.selectedCategory, this.filter);
  }

  getFilter(filter: string) {
    this.filter = filter;
    this.filterProducts(this.selectedCategory, this.filter);
  }

  filterProducts(category: string, filter: string){
    this.currentPage = 1;
    this.products$ = this.service.getProductsByCategory(category);
    this.products$ = this.service.getByFilter(filter, this.products$);
    this.products$ = this.service.paginate(this.products$, this.currentPage, this.limit);
  }

  onPageChange(newPage: number) {
    this.currentPage = newPage;
    this.filterProducts(this.selectedCategory, this.filter);
  }

  addToCart(id: number) {
    this.cartService.addToCart(id, 1).subscribe({
      next: () => console.log('Ajouté au panier'),
      error: (err) => alert(err.message)
    });
  }
}
