import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-pagina-titulo',
  imports: [],
  templateUrl: './pagina-titulo.html',
  styleUrl: './pagina-titulo.css',
})

export class PaginaTitulo {
  @Input() titulo: string = "";
}
