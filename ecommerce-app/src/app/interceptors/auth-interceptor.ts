import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const currentUser = localStorage.getItem('currentUser');
  
  if (currentUser) {
    const user = JSON.parse(currentUser);
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${user.id}`
      }
    });
    return next(authReq);
  }
  return next(req);
};
