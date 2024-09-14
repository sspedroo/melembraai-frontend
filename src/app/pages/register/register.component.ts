import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FooterComponent } from "../../shared/footer/footer.component";
import { HeaderComponent } from "../../shared/header/header.component";
import { ButtonModule } from 'primeng/button';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RegisterService } from '../../services/register.service';
import { HttpClient } from '@angular/common/http';
import { Register, RegisterResponse } from '../../models/register.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FooterComponent, HeaderComponent, ButtonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [RegisterService]
})
export class RegisterComponent {
  form = new FormGroup({
    name: new FormControl('', {
      validators: [Validators.required],
    }),
    email: new FormControl('', {
      validators: [Validators.required, Validators.email],
    }),
    password: new FormControl('', {
      validators: [Validators.required, Validators.minLength(6)],
    }),
    confirmPassword: new FormControl('', {
      validators: [Validators.required, Validators.minLength(6)],
    }),
  })

  hidePassword = signal(true);
  hideConfirmPassword = signal(true);

  constructor(private registerService: RegisterService, private http: HttpClient, private router: Router) { }

  showPasswordEvent(event: MouseEvent) {
    this.hidePassword.set(false);
    event.stopPropagation();
  }

  hidePasswordEvent(event: MouseEvent) {
    this.hidePassword.set(true);
    event.stopPropagation();
  }

  clickEvent(event: MouseEvent) {
    this.hidePassword.set(!this.hidePassword());
    event.stopPropagation();
  }
  clickEvent2(event: MouseEvent) {
    this.hideConfirmPassword.set(!this.hideConfirmPassword());
    event.stopPropagation();
  }

  onSubmit() {
    if (this.form.invalid) {
      return;
    }

    const formData = this.form.value;

    this.registerService.register(formData as Register).subscribe({
      next: (response: RegisterResponse) => {
        console.log(response);
        this.router.navigate(['/confirm-email'], { queryParams: { userId: response.id } });
      },
      error: (error: any) => {
        console.error(error);
      },
      complete: () => {
        // handle complete if needed
      }
    });

    this.form.reset();
  }
}
