import { Component, signal } from '@angular/core';
import { HeaderComponent } from "../../shared/header/header.component";
import { ButtonModule } from 'primeng/button';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FooterComponent } from "../../shared/footer/footer.component";
import { LoginBannerComponent } from "../../components/login-banner/login-banner.component";
import { TextInputComponent } from "../../components/text-input/text-input.component";
import { LoginService } from '../../services/login.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    HeaderComponent,
    ButtonModule,
    ReactiveFormsModule,
    FooterComponent,
    LoginBannerComponent,
    TextInputComponent,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  form = new FormGroup({
    email: new FormControl('', {
      validators: [Validators.required, Validators.email],
    }),
    password: new FormControl('', {
      validators: [Validators.required, Validators.minLength(6)],
    }),
  });

  hidePassword = signal(true);
  errorMessage = signal('');

  constructor(
    private loginService: LoginService,
    private http: HttpClient,
    private router: Router
  ) {}

  clickEvent(event: MouseEvent) {
    this.hidePassword.set(!this.hidePassword());
    event.stopPropagation();
  }


  onSubmit() {
    if (this.form.invalid) {
      return;
    }

    this.loginService.login(this.form.value as any)
    .subscribe({
        next: (response) => {
          this.loginService.saveDataInLocalStorage(response);
          this.router.navigate(['/home']);
          this.form.reset();
        },
        error: (error) => {
          if (error.error && error.error.body) {
            this.errorMessage.set(error.error.body.detail);
          }
        },
        complete: () => {

        }
      })
  }
}
