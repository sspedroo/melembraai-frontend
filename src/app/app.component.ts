import { registerLocaleData } from '@angular/common';
import { Component, LOCALE_ID, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PrimeNGConfig } from 'primeng/api';
import localePt from '@angular/common/locales/pt';
import { HeaderComponent } from "./shared/header/header.component";
import { HomeComponent } from "./pages/home/home.component";
import { InfiniteCarouselComponent } from "./components/infinite-carousel/infinite-carousel.component";


registerLocaleData(localePt);

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, HomeComponent, InfiniteCarouselComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [
    {
      provide: LOCALE_ID,
      useValue: 'pt-BR'
    }
  ]
})
export class AppComponent implements OnInit {
  title = 'Me Lembra Ai';

  constructor(private primengConfig: PrimeNGConfig) {}

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    this.primengConfig.setTranslation({
    accept: "Sim",
    addRule: "Adicionar Regra",
    am: "AM",
    apply: "Aplicar",
    cancel: "Cancelar",
    choose: "Escolher",
    chooseDate: "Escolher Data",
    chooseMonth: "Escolher Mês",
    chooseYear: "Escolher Ano",
    clear: "Limpar",
    contains: "Contém",
    dateAfter: "Data depois de",
    dateBefore: "Data antes de",
    dateFormat: "dd/MM/yy",
    dateIs: "Data é",
    dateIsNot: "Data não é",
    dayNames: [
      "Domingo",
      "Segunda-feira",
      "Terça-feira",
      "Quarta-feira",
      "Quinta-feira",
      "Sexta-feira",
      "Sábado"
    ],
    dayNamesMin: [
      "D",
      "S",
      "T",
      "Q",
      "Q",
      "S",
      "S"
    ],
    dayNamesShort: [
      "Dom",
      "Seg",
      "Ter",
      "Qua",
      "Qui",
      "Sex",
      "Sáb"
    ],
    emptyFilterMessage: "Nenhum resultado encontrado",
    emptyMessage: "Nenhuma opção disponível",
    emptySearchMessage: "Nenhum resultado encontrado",
    emptySelectionMessage: "Nenhum item selecionado",
    endsWith: "Termina com",
    equals: "Igual",
    fileSizeTypes: [
      "B",
      "KB",
      "MB",
      "GB",
      "TB",
      "PB",
      "EB",
      "ZB",
      "YB"
    ],
    firstDayOfWeek: 0,
    gt: "Maior que",
    gte: "Maior ou igual a",
    lt: "Menor que",
    lte: "Menor ou igual a",
    matchAll: "Corresponder Todos",
    matchAny: "Corresponder Qualquer",
    medium: "Médio",
    monthNames: [
      "Janeiro",
      "Fevereiro",
      "Março",
      "Abril",
      "Maio",
      "Junho",
      "Julho",
      "Agosto",
      "Setembro",
      "Outubro",
      "Novembro",
      "Dezembro"
    ],
    monthNamesShort: [
      "Jan",
      "Fev",
      "Mar",
      "Abr",
      "Mai",
      "Jun",
      "Jul",
      "Ago",
      "Set",
      "Out",
      "Nov",
      "Dez"
    ],
    nextDecade: "Próxima Década",
    nextHour: "Próxima Hora",
    nextMinute: "Próximo Minuto",
    nextMonth: "Próximo Mês",
    nextSecond: "Próximo Segundo",
    nextYear: "Próximo Ano",
    noFilter: "Sem Filtro",
    notContains: "Não contém",
    notEquals: "Diferente",
    passwordPrompt: "Digite uma senha",
    pending: "Pendente",
    pm: "PM",
    prevDecade: "Década Anterior",
    prevHour: "Hora Anterior",
    prevMinute: "Minuto Anterior",
    prevMonth: "Mês Anterior",
    prevSecond: "Segundo Anterior",
    prevYear: "Ano Anterior",
    reject: "Não",
    removeRule: "Remover Regra",
    searchMessage: "Existem {0} resultados disponíveis",
    selectionMessage: "{0} itens selecionados",
    startsWith: "Começa com",
    strong: "Forte",
    today: "Hoje",
    upload: "Enviar",
    weak: "Fraco",
    weekHeader: "Sem",
    aria: {
      "cancelEdit": "Cancelar Edição",
      "close": "Fechar",
      "collapseRow": "Recolher Linha",
      "editRow": "Editar Linha",
      "expandRow": "Expandir Linha",
      "falseLabel": "Falso",
      "filterConstraint": "Restrição de Filtro",
      "filterOperator": "Operador de Filtro",
      "firstPageLabel": "Primeira Página",
      "gridView": "Visualização de Grade",
      "hideFilterMenu": "Esconder Menu de Filtro",
      "jumpToPageDropdownLabel": "Ir para a Página",
      "jumpToPageInputLabel": "Ir para a Página",
      "lastPageLabel": "Última Página",
      "listView": "Visualização de Lista",
      "moveAllToSource": "Mover Todos para a Origem",
      "moveAllToTarget": "Mover Todos para o Destino",
      "moveBottom": "Mover para o Final",
      "moveDown": "Mover para Baixo",
      "moveTop": "Mover para o Topo",
      "moveToSource": "Mover para a Origem",
      "moveToTarget": "Mover para o Destino",
      "moveUp": "Mover para Cima",
      "navigation": "Navegação",
      "next": "Próximo",
      "nextPageLabel": "Próxima Página",
      "nullLabel": "Não Selecionado",
      "pageLabel": "Página {page}",
      "previous": "Anterior",
      "previousPageLabel": "Página Anterior",
      "removeLabel": "Remover",
      "rotateLeft": "Rotacionar para a Esquerda",
      "rotateRight": "Rotacionar para a Direita",
      "rowsPerPageLabel": "Linhas por página",
      "saveEdit": "Salvar Edição",
      "scrollTop": "Rolar para o Topo",
      "selectAll": "Todos os itens selecionados",
      "selectRow": "Linha Selecionada",
      "showFilterMenu": "Mostrar Menu de Filtro",
      "slide": "Deslizar",
      "slideNumber": "Slide {slideNumber}",
      "star": "1 estrela",
      "stars": "{star} estrelas",
      "trueLabel": "Verdadeiro",
      "unselectAll": "Todos os itens desmarcados",
      "unselectRow": "Linha Desmarcada",
      "zoomImage": "Ampliar Imagem",
      "zoomIn": "Ampliar",
      "zoomOut": "Reduzir"
    }
    })
  }
}
