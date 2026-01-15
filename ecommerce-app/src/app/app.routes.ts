import { Routes } from '@angular/router';
import { ProductList } from './components/product-list/product-list';
import { Cart } from './components/cart/cart';
import { Login } from './components/login/login';
import { OrderHistory } from './components/order-history/order-history';

export const routes: Routes = [
{ path: '', component: ProductList },
  { path: 'cart', component: Cart },
  { path: 'login', component: Login},
  { path: 'order-history', component: OrderHistory },
  { path: '**', redirectTo: '' }
];
