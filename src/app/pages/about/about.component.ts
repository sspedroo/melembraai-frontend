import { Component } from '@angular/core';
import { HeaderComponent } from "../../shared/header/header.component";
import { CardComponent } from "../../components/card/card.component";
import { FooterComponent } from "../../shared/footer/footer.component";

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [HeaderComponent, CardComponent, FooterComponent],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent {


  content: string = 'A motivação da criação foi quando minha querida irmã me mandou uma mensagem pergutando se eu sabia algum site que ela pudesse mandar um e-mail para ela mesma. Eu procurei e mandei para ela, mas fiquei pensando que seria muito mais legal se eu pudesse criar um site para ela fazer isso. E assim nasceu o Me Lembra Ai.';
}
