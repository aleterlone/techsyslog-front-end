import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgbTooltip } from '@ng-bootstrap/ng-bootstrap';

// Features

import { PedidoService } from '../../services/pedido-service';

// Models

import { PedidoSintetico } from '../../models/pedido-sintetico';

// Shared

import { PaginaTitulo } from '../../../../shared/components/pagina-titulo/pagina-titulo';
import { PedidoMovimentarModal } from "../../components/pedido-movimentar-modal/pedido-movimentar-modal";
import { ModalResultadoEnum, PedidoStatusEnum, ToastEstiloEnum } from '../../../../shared/enums';
import { ToastService } from '../../../../shared/components/toasts/services/toast-service';

@Component({
  selector: 'app-pedido-listar',
  imports: [
    CommonModule,
    NgbTooltip,

    PaginaTitulo,
    PedidoMovimentarModal
],
  templateUrl: './pedido-listar.html',
  styleUrl: './pedido-listar.css',
})

export class PedidoListar {
  private readonly _router = inject(Router);

  private readonly _pedidoService = inject(PedidoService);
  
  private readonly _toastService = inject(ToastService);
  
  pedidosSinteticos = signal<PedidoSintetico[]>([]);

  pedidoSinteticoMovimentar: PedidoSintetico | null = null;

  constructor() { }

  ngOnInit() {
    this.obterDados();
  }

  incluir() {
    this._router.navigate(["/home/pedido-cadastrar"]);
  }

  movimentar(pedido_sintetico: PedidoSintetico) {
    if (pedido_sintetico.status?.id != PedidoStatusEnum.Entregue) {
      this.pedidoSinteticoMovimentar = pedido_sintetico;
    } else {
      this._toastService.exibir(ToastEstiloEnum.Danger, "Pedido já entregue!");
    }
  }

  obterDados() {
    this._pedidoService.obter().subscribe((resultado) => {
      this.pedidosSinteticos.set(resultado);
    });
  }

  receberPedidoMovimentar(modal_resultado: ModalResultadoEnum) {
    switch (modal_resultado) {
      case ModalResultadoEnum.Salvar:
        this.obterDados();

        break;
      default:
        break;
    }

    if (modal_resultado != ModalResultadoEnum.Erro) {
      this.pedidoSinteticoMovimentar = null;
    }
  }
}
