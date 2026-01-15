import { Component, Input } from '@angular/core';
import { Product } from '../../models/products';

@Component({
  selector: 'app-product',
  imports: [],
  templateUrl: './product.html',
  styleUrl: './product.scss',
})

export class ProductComponent {
  @Input() product!: Product
  

}
