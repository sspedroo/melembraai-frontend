import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfirmEmail, Register, RegisterResponse } from '../models/register.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  private readonly apiUrl = `https://melembraai.onrender.com/users/register`;

  constructor(private http: HttpClient) {}

  register(body: Register): Observable<RegisterResponse> {
    this.clearLocalStorage();
    return this.http.post<RegisterResponse>(this.apiUrl, body);
  }

  confirmEmail(body: ConfirmEmail): Observable<string> {
    return this.http.post<string>(
      `https://melembraai.onrender.com/users/${body.userId}/activate?token=${body.token}`,
      body,
      { responseType: 'text' as 'json' }
    );
  }

  clearLocalStorage() {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('expiresAt');
    localStorage.removeItem('username');
    localStorage.removeItem('email');
  }
}
