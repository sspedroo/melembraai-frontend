import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { SendEmailService } from '../../services/send-email.service';
import { RegisterEmail } from '../../models/register-email.model';

@Component({
  selector: 'app-email-builder',
  standalone: true,
  imports: [ButtonModule, ReactiveFormsModule],
  templateUrl: './email-builder.component.html',
  styleUrl: './email-builder.component.scss',
  providers: [SendEmailService],
})
export class EmailBuilderComponent {
  emailForm = new FormGroup({
    title: new FormControl('', {
      validators: [Validators.required],
    }),
    content: new FormControl('', {
      validators: [Validators.required],
    }),
    hasRepetition: new FormControl('', {
      validators: [Validators.required],
    }),
    repetitionIntervalDays: new FormControl('', {
      validators: [Validators.required],
    }),
    remainingRepetitions: new FormControl('', {
      validators: [Validators.required],
    }),
    sendDate: new FormControl('', {
      validators: [Validators.required],
    }),
  });

  constructor(private sendEmailService: SendEmailService) {}

  buildEmail(emailForm: FormGroup) {
    const title = emailForm.controls['title'].value;
    const content = emailForm.controls['content'].value;
    const hasRepetition = emailForm.controls['hasRepetition'].value;
    const repetitionIntervalDays =
      emailForm.controls['repetitionIntervalDays'].value;
    const remainingRepetitions =
      emailForm.controls['remainingRepetitions'].value;
    const sendDate = emailForm.controls['sendDate'].value;

    if (hasRepetition === 'no') {
      emailForm.controls['hasRepetition'].setValue(false);
      emailForm.controls['repetitionIntervalDays'].setValue(0);
      emailForm.controls['remainingRepetitions'].setValue(1);
    } else {
      emailForm.controls['hasRepetition'].setValue(true);
    }
  }

  getMinDate(): Date {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    return tomorrow;
  }

  onSubmit() {
    const emailForm = this.emailForm;
    this.buildEmail(emailForm);
    const form = emailForm.value;

    const registerEmail: RegisterEmail = {
      title: form.title as string,
      content: form.content as string,
      hasRepetition: form.hasRepetition as unknown as boolean,
      repetitionIntervalDays: form.repetitionIntervalDays as unknown as number,
      remainingRepetitions: form.remainingRepetitions as unknown as number,
      sendDate: '17/09/2024',
    };

    this.sendEmailService.registerEmail(registerEmail).subscribe({
      next: (response) => {
        console.log('Email registered:', response);
        emailForm.reset();
      },
      error: (error) => console.error('Error registering email:', error),
      complete: () => console.log('Email registration completed'),
    });
  }
}
