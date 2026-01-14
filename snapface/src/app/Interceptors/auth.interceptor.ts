// interceptors/auth.interceptor.ts
import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { authService } from '../service/auth.service';

export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(authService);
  
  console.log('🔐 Intercepteur appelé pour:', req.url);
  
  const modifiedReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${auth.getToken()}`
    }
  });
  
  return next(modifiedReq);
};