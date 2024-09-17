import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logged-header',
  standalone: true,
  imports: [ButtonModule],
  templateUrl: './logged-header.component.html',
  styleUrl: './logged-header.component.scss',
  providers: [LoginService]
})
export class LoggedHeaderComponent {
  constructor(private loginService: LoginService, private router: Router) {}

  logout() {
    this.loginService.logout();
    this.router.navigate(['/login']);
  }
}
