import { Component } from '@angular/core';
import { HeaderComponent } from "../../shared/header/header.component";
import { ButtonModule } from 'primeng/button';
import { FooterComponent } from "../../shared/footer/footer.component";
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [
    HeaderComponent,
    ButtonModule,
    FooterComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
})
export class ContactComponent {

  contactForm = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    message: new FormControl('', Validators.required),
  });

  showSuccess: boolean = false;

  onSubmit() {
    const email = this.contactForm.value.email;
    const name = this.contactForm.value.name;
    const message = this.contactForm.value.message;

    console.log({
      name: name,
      email: email,
      message: message,
    });

    this.showSuccess = true;

    setInterval(() => (this.showSuccess = false), 5000);
  }
}
