import { Component, signal } from '@angular/core';
import { HeaderComponent } from "../../shared/header/header.component";
import { ButtonModule } from 'primeng/button';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FooterComponent } from "../../shared/footer/footer.component";
import { LoginBannerComponent } from "../../components/login-banner/login-banner.component";
import { TextInputComponent } from "../../components/text-input/text-input.component";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    HeaderComponent,
    ButtonModule,
    ReactiveFormsModule,
    FooterComponent,
    LoginBannerComponent,
    TextInputComponent
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
  })

  hidePassword = signal(true);

  clickEvent(event: MouseEvent) {
    this.hidePassword.set(!this.hidePassword());
    event.stopPropagation();
  }
}
