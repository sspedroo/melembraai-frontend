import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegisterEmail } from '../models/register-email.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SendEmailService {
  private readonly apiUrl = `https://melembraai.onrender.com/email`;

  constructor(private http: HttpClient) {}

  registerEmail(email: RegisterEmail): Observable<void> {
    return this.http.post<void>(this.apiUrl, email);
  }
}
