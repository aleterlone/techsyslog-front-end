import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

// Models

import { PedidoSintetico } from '../../models/pedido-sintetico';

// Shared

import { PaginaTitulo } from '../../../../shared/components/pagina-titulo/pagina-titulo';

@Component({
  selector: 'app-pedido-listar',
  imports: [
    PaginaTitulo
  ],
  templateUrl: './pedido-listar.html',
  styleUrl: './pedido-listar.css',
})

export class PedidoListar {
  private readonly _router = inject(Router);

  pedidosSinteticos: PedidoSintetico[] = [];

  constructor() { }

  incluir() {
    this._router.navigate(["/home/pedido-cadastrar"]);
  }
}
