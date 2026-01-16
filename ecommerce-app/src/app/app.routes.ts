import { Routes } from '@angular/router';
import { ProductList } from './components/product-list/product-list';
import { CartComponent } from './components/cart/cart';
import { Login } from './components/login/login';
import { OrderHistory } from './components/order-history/order-history';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
    { path: '', component: ProductList, canActivate: [authGuard] },
    { path: 'cart', component: CartComponent, canActivate: [authGuard] },
    { path: 'login', component: Login},
    { path: 'order-history', component: OrderHistory, canActivate: [authGuard] },
    { path: '**', redirectTo: '' }
];
