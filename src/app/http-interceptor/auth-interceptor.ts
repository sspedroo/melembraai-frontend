// import { Injectable } from '@angular/core';
// import {
//   HttpInterceptor,
//   HttpRequest,
//   HttpHandler,
//   HttpEvent,
// } from '@angular/common/http';
// import { catchError, Observable, switchMap, throwError } from 'rxjs';
// import { LoginService } from '../services/login.service';

// @Injectable()
// export class AuthInterceptor implements HttpInterceptor {
//   publicEndpoints = ['/auth/login', '/users/register', '/users/activate'];

//   constructor(private loginService: LoginService) {}

//   intercept(
//     req: HttpRequest<any>,
//     next: HttpHandler
//   ): Observable<HttpEvent<any>> {

//     console.log('Interceptando requisição...');

// if (this.isLoggedIn()) {
//   if (this.isTokenExpired()) {
//     console.log('Token expirado. Atualizando...');
//     // Retorna o fluxo para evitar o loop infinito
//     return this.loginService.refreshToken().pipe(
//       switchMap((response) => {
//         // Atualiza o token no localStorage
//         this.loginService.saveDataInLocalStorage(response);
//         // Clona a requisição original com o novo token
//         const authReq = req.clone({
//           headers: req.headers.set(
//             'Authorization',
//             `Bearer ${this.loginService.getJwtToken()}`
//           ),
//         });
//         // Passa a requisição clonada adiante no fluxo
//         console.log('Token atualizado com sucesso');
//         return next.handle(authReq);
//       }),
//       // Lida com erros, caso o refresh falhe
//       catchError((error) => {
//         console.error('Erro ao atualizar o token', error);
//         return throwError(() => error);
//       })
//     );
//   } else {
//     // Token ainda é válido, continua com a requisição normalmente
//     const authReq = req.clone({
//       headers: req.headers.set(
//         'Authorization',
//         `Bearer ${this.loginService.getJwtToken()}`
//       ),
//     });
//     return next.handle(authReq);
//   }
// }

//     if (this.isPublicEndpoint(req.url)) {
//       return next.handle(req);
//     }

//     const token = this.loginService.getJwtToken();

//     if (token && !this.isPublicEndpoint(req.url)) {
//       console.log('Token existente. Continuando...');
//       if (this.isTokenExpired()){
//         console.log('Token expirado. Atualizando...');
//         this.loginService.refreshToken().subscribe({
//           next: (response) => {
//             this.loginService.saveDataInLocalStorage(response);
//             const authReq = req.clone({
//               headers: req.headers.set('Authorization', `Bearer ${this.loginService.getJwtToken()}`)
//             });
//             return next.handle(authReq);
//           }
//         })
//       } else {
//         const authReq = req.clone({
//           headers: req.headers.set('Authorization', `Bearer ${token}`),
//         });
//         console.log('Apenas adicionou no headers...')
//         return next.handle(authReq);
//       }
//     }

//     console.log('Passou direto');
//     return next.handle(req);
//   }

//   isPublicEndpoint = (url: string) => {
//     return this.publicEndpoints.some((endpoint) => {
//       // Verifica se a URL começa com "/users/" e termina com "/activate"
//       if (endpoint === '/users/activate') {
//         return url.startsWith('/users/') && url.endsWith('/activate');
//       }
//       // Verifica se a URL corresponde a um dos outros endpoints
//       const relativeUrl = url.replace('http://localhost:8080', '');
      
//       return relativeUrl === endpoint;
//     });
//   };

//   isTokenExpired(): boolean {
//     console.log(this.loginService.isTokenExpired());
//     return this.loginService.isTokenExpired();
//   }

//   isLoggedIn(): boolean {
//     return this.loginService.isAlreadyLoggedIn();
//   }

// }
