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
    // Remove the base URL if present (adjust as per your environment)
    const relativeUrl = url.replace('http://localhost:8080', '');

    return publicEndpoints.some((endpoint) => {
      // Special case for /users/{id}/activate
      if (endpoint === '/users/activate') {
        return (
          relativeUrl.startsWith('/users/') && relativeUrl.endsWith('/activate')
        );
      }

      // For other endpoints, check if the relative URL matches the endpoint
      return relativeUrl === endpoint;
    });
  };

  // Check if the current request URL matches any public endpoints, including refresh token
  if (isPublicEndpoint(req.url)) {
    console.log('Endpoint público, não é necessário adicionar token');
    return next(req); // Proceed without token for public endpoints, including refresh
  }

  // If there's no token or the token is already expired, refresh the token first
  if (token && loginService.isTokenExpired()) {
    // Check if the request is already trying to refresh the token to prevent infinite loop
    if (req.url.includes('/auth/refresh')) {
      return next(req); // Skip interceptor for token refresh request
    }

    // Call refresh token logic
    console.log('Token expirado, atualizando antes de fazer a requisição...');
    return loginService.refreshToken().pipe(
      switchMap((response) => {
        // Save the new token in localStorage
        loginService.saveDataInLocalStorage(response);

        // Clone the request with the new token
        const newRequest = req.clone({
          setHeaders: {
            Authorization: `Bearer ${response.token}`,
          },
        });

        // Proceed with the new request
        return next(newRequest);
      }),
      catchError((refreshError) => {
        console.error('Erro ao atualizar o token:', refreshError);
        // If refresh token fails, propagate the error
        return throwError(() => refreshError);
      })
    );
  }

  // If token exists and is not expired, attach it to the request
  if (token && !loginService.isTokenExpired()) {
    req = req.clone({ setHeaders: { Authorization: `Bearer ${token}` } });
    return next(req); // Proceed with the request
  }

  // If no token exists or token can't be refreshed, just continue the request without token
  return next(req);
};
