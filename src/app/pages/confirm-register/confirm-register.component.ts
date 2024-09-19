import { Component, input, OnInit } from '@angular/core';
import { HeaderComponent } from "../../shared/header/header.component";
import { FooterComponent } from "../../shared/footer/footer.component";
import { ButtonModule } from 'primeng/button';
import { ActivatedRoute, Router } from '@angular/router';
import { RegisterService } from '../../services/register.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-confirm-register',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, ButtonModule, FormsModule],
  templateUrl: './confirm-register.component.html',
  styleUrl: './confirm-register.component.scss',
  providers: [RegisterService]
})
export class ConfirmRegisterComponent implements OnInit {
  userId!: string;
  token!: string;

  constructor(private route: ActivatedRoute, private registerService: RegisterService, private router: Router) {}
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.userId = params['userId'];
    })
  }

  validateEmail(userId: string, token: string) {
    const body = {
      userId: userId,
      token: token
    }

    this.registerService.confirmEmail(body).subscribe({
      next: (response: string) => {
        this.router.navigate(['/login']);
      },
      error: (error: any) => {
      }
    });

  }
}
