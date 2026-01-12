import { Component } from '@angular/core';

// Shared

import { PaginaTitulo } from '../../../../shared/components/pagina-titulo/pagina-titulo';

@Component({
  selector: 'app-home',
  imports: [
    PaginaTitulo
  ],
  templateUrl: './home.html',
  styleUrl: './home.css',
})

export class Home {

}
