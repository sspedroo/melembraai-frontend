import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfirmEmail, Register, RegisterResponse } from '../models/register.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  private readonly apiUrl = `http://localhost:8080/users/register`;

  constructor(private http: HttpClient) {}

  register(body: Register): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>(this.apiUrl, body);
  }

  confirmEmail(body: ConfirmEmail): Observable<string> {
    return this.http.post<string>(`http://localhost:8080/users/${body.userId}/activate?token=${body.token}`, body, { responseType: 'text' as 'json' });
  }
}
