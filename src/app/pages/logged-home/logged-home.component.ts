import { Component } from '@angular/core';
import { FooterComponent } from "../../shared/footer/footer.component";
import { LoggedHeaderComponent } from "../../shared/logged-header/logged-header.component";
import { EmailBuilderComponent } from "../../components/email-builder/email-builder.component";

@Component({
  selector: 'app-logged-home',
  standalone: true,
  imports: [FooterComponent, LoggedHeaderComponent, EmailBuilderComponent],
  templateUrl: './logged-home.component.html',
  styleUrl: './logged-home.component.scss'
})
export class LoggedHomeComponent {

}
