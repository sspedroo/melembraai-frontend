import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginResponse } from '../models/login.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private readonly apiUrl = `https://melembraai.onrender.com/auth/login`;

  constructor(private http: HttpClient) {}

  login(body: { email: string; password: string }): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(this.apiUrl, body);
  }

  saveDataInLocalStorage(response: LoginResponse) {
    localStorage.setItem('token', response.token);
    localStorage.setItem('username', response.username);
    localStorage.setItem('email', response.email);
    localStorage.setItem('refreshToken', response.refreshToken);
    const expiresAt = new Date().getTime() + 1 * 60 * 1000;
    localStorage.setItem('expiresAt', expiresAt.toString());
  }

  refreshToken(): Observable<LoginResponse> {
    const refreshToken = localStorage.getItem('refreshToken');
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${refreshToken}`
    );
    return this.http.post<LoginResponse>(
      `https://melembraai.onrender.com/auth/refresh`,
      null,
      { headers }
    );
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('expiresAt');
    localStorage.removeItem('username');
    localStorage.removeItem('email');
  }

  getTokenExpiration(): number | null {
    const expiration = localStorage.getItem('expiresAt');
    return expiration ? parseInt(expiration, 10) : null;
  }

  getJwtToken(): string | null {
    return localStorage.getItem('token');
  }

  getRefreshToken(): string | null {
    return localStorage.getItem('refreshToken');
  }

  isTokenExpired(): boolean {
    const expiration = this.getTokenExpiration();
    if (!expiration) {
      return true;
    }

    return new Date().getTime() > expiration;
  }

  isAlreadyLoggedIn(): boolean {
    return !!this.getJwtToken(); //Explicação pq eu esqueço smp
    // !! é um operador de negação dupla. Ele converte o valor para um booleano e depois inverte ele.
    // o getJwtToken retorna uma string ou null se nao tiver nada, o primeiro ! inverte o valor, o segundo ! inverte de novo assim fica correto
  }
}
