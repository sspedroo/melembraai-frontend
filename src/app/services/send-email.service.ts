import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegisterEmail } from '../models/register-email.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SendEmailService {
  private readonly apiUrl = `http://localhost:8080/email`;

  constructor(private http: HttpClient) {}

  registerEmail(email: RegisterEmail): Observable<void> {
    return this.http.post<void>(this.apiUrl, email);
  }
}
