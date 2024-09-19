import {
  HttpErrorResponse,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, map, switchMap, throwError } from 'rxjs';
import { LoginService } from '../services/login.service';

export const TokenInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
) => {
  const token = localStorage.getItem('token'); // Recupera o token do localStorage
  const loginService = inject(LoginService); // Injeta o LoginService
  const publicEndpoints = [
    '/auth/login',
    '/users/register',
    '/users/activate',
    '/auth/refresh',
  ];

  const isPublicEndpoint = (url: string) => {
    // Remove a url base 
    const relativeUrl = url.replace('http://localhost:8080', '');

    return publicEndpoints.some((endpoint) => {
      // Analise especial para o endpoint de ativação de usuário
      if (endpoint === '/users/activate') {
        return (
          relativeUrl.startsWith('/users/') && relativeUrl.endsWith('/activate')
        );
      }
      // Para os outros endpoints, compara a url com os endpoints públicos
      return relativeUrl === endpoint;
    });
  };

  // Confiro se a atual url é um endpoint public, incluindo o endpoint de refresh
  if (isPublicEndpoint(req.url)) {
    return next(req); // continua a requisição sem adicionar token
  }

  // Confiro se o token existe e se está expirado
  if (token && loginService.isTokenExpired()) {
    // confiro se a url é a de refresh token
    if (req.url.includes('/auth/refresh')) {
      return next(req); // se estiver atualizando o token, continua a requisição sem adicionar token
    }

    // Se não for refresh token, tenta adquirir um novo token
    return loginService.refreshToken().pipe(
      switchMap((response) => {
        // Salvo a resposta do refresh token no localStorage
        loginService.saveDataInLocalStorage(response);

        // Clono a requisição com o novo token
        const newRequest = req.clone({
          setHeaders: {
            Authorization: `Bearer ${response.token}`,
          },
        });

        // Continua a requisição com o novo token
        return next(newRequest);
      }),
      catchError((refreshError) => {
        console.error('Erro ao atualizar o token:', refreshError);
        // If refresh token fails, propagate the error
        return throwError(() => refreshError);
      })
    );
  }

  // Se o token existe e não está expirado, adiciona o token ao cabeçalho da requisição
  if (token && !loginService.isTokenExpired()) {
    req = req.clone({ setHeaders: { Authorization: `Bearer ${token}` } });
    return next(req); // Continuo com a requisição com o token atual
  }

  // Se o token não existe ou não pode ser atualizado, somente segue com a requisição
  return next(req);
};
