import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

// Features

import { PedidoService } from '../../services/pedido-service';

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

  private readonly _pedidoService = inject(PedidoService);

  pedidosSinteticos: PedidoSintetico[] = [];

  constructor() { }

  ngOnInit() {
    this.obterDados();
  }

  incluir() {
    this._router.navigate(["/home/pedido-cadastrar"]);
  }

  obterDados() {
    this._pedidoService.obter().subscribe((resultado) => {
      this.pedidosSinteticos = resultado;
    });
  }
}
