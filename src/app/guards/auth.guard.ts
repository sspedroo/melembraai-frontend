import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from '../services/login.service';

export const authGuard: CanActivateFn = (route, state) => {
  const loginService = inject(LoginService); // Injeta o LoginService
  const router = inject(Router); // Injeta o Router

  if (loginService.isAlreadyLoggedIn()){
    return true; // Se o usuário estiver logado, permite acessar a rota
  }

  return router.navigate(['/ ']);
};
