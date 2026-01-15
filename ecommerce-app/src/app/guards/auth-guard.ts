import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth';

export const authGuard: CanActivateFn = (route, state) => {
  const service = inject(AuthService)

  const router = inject(Router)

  const logged = service.isLoggedIn()
  if(logged === false){
   router.navigateByUrl('login')
   return false
  }
  return true
};
