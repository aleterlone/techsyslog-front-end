import { Component, ElementRef, EventEmitter, inject, Input, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbDatepickerModule, NgbModal, NgbModalModule, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

// Features

import { PedidoService } from '../../services/pedido-service';
import { PedidoStatusService } from '../../../pedidos-status/services/pedido-status-service';

// Models

import { PedidoSintetico } from '../../models/pedido-sintetico';

// Shared

import { formatarData } from '../../../../shared/formatters';
import { ModalResultadoEnum, PedidoStatusEnum, ToastEstiloEnum } from '../../../../shared/enums';
import { PedidoStatus } from '../../../pedidos-status/models/pedido-status';
import { ToastService } from '../../../../shared/components/toasts/services/toast-service';

@Component({
  selector: 'app-pedido-movimentar-modal',
  imports: [
    NgbDatepickerModule,
    NgbModalModule,
    ReactiveFormsModule
  ],
  templateUrl: './pedido-movimentar-modal.html',
  styleUrl: './pedido-movimentar-modal.css',
})

export class PedidoMovimentarModal {
  private readonly _formBuilder = inject(FormBuilder);
  private readonly _ngbModalService = inject(NgbModal)

  private readonly _pedidoService = inject(PedidoService);
  private readonly _pedidoStatusService = inject(PedidoStatusService);

  private readonly _toastService = inject(ToastService);

  // Data (Hoje)

  hoje = new Date();

  dataHoje = {
    year: this.hoje.getFullYear(),
    month: this.hoje.getMonth() + 1,
    day: this.hoje.getDate()
  };

  // Formulário

  formulario!: FormGroup;

  formularioEnviado: boolean = false;

  // Pedido (Status)

  pedidosStatus: PedidoStatus[] = [];

  pedidoStatusSelecionado: PedidoStatus | null = null;

  @Input() pedidoSintetico: PedidoSintetico | null = null;

  @Output() resultadoPedidoMovimentar = new EventEmitter<ModalResultadoEnum>();

  @ViewChild("pedidoMovimentarModal") pedidoMovimentarModal!: ElementRef;

  // Modal

  modalReferencia: NgbModalRef | null = null;

  constructor() {
    this.formulario = this._formBuilder.group({
      nro_pedido: [{ value: 0, disabled: true }],
      nome: [{ value: "", disabled: true }],
      id_pedido_status: ["", Validators.required],
      dt_entrega: [null]
    });
  }

  ngOnChanges(alteracoes: SimpleChanges) {
    if (alteracoes.hasOwnProperty("pedidoSintetico")) {
      if (this.pedidoSintetico != null) {
        this.f["nro_pedido"].setValue(this.pedidoSintetico.nroPedido);
        this.f["nome"].setValue(this.pedidoSintetico.nome);

        this.exibirModal();
      } else {
        this.limparFormulario();

        this.modalReferencia?.close();
      }
    }
  }

  ngOnDestroy() {
    this.modalReferencia?.close();
  }

  get f() {
    return this.formulario.controls;
  }

  get modalResultadoEnum(): typeof ModalResultadoEnum {
    return ModalResultadoEnum;
  }

  get pedidoStatusEnum(): typeof PedidoStatusEnum {
    return PedidoStatusEnum;
  }

  exibirModal() {
    this._pedidoStatusService.obter().subscribe((resultado) => {
      this.pedidosStatus = resultado.filter(r => r.id != this.pedidoSintetico?.status?.id);

      this.modalReferencia = this._ngbModalService.open(this.pedidoMovimentarModal, {
        ariaLabelledBy: "modalPedidoMovimentar",
        backdrop: "static",
        keyboard: false,
        size: "lg"
      });
    });
  }

  limparFormulario() {
    // Formulário

    this.formulario.reset();

    this.formularioEnviado = false;

    this.f["id_pedido_status"].setValue("");

    this.f["dt_entrega"].clearValidators();

    // Pedido (Status)

    this.pedidoStatusSelecionado = null;

    this.formulario.updateValueAndValidity();
  }

  monitorar(modal_resultado: ModalResultadoEnum) {
    switch (modal_resultado) {
      case ModalResultadoEnum.Salvar:
        this.formularioEnviado = true;

        if (this.formulario.valid) {
          if (
            this.pedidoSintetico != null &&
            this.pedidoSintetico.id != null &&
            this.pedidoStatusSelecionado != null &&
            this.pedidoStatusSelecionado.id != null
          ) {
            let dataEntrega: Date | null = null;

            if (this.pedidoStatusSelecionado.id == PedidoStatusEnum.Entregue) {
              dataEntrega = formatarData(this.f["dt_entrega"].value);
            }

            this._pedidoService.alterarPedidoStatusPorId(this.pedidoSintetico.id, this.pedidoStatusSelecionado.id, dataEntrega).subscribe((resultado) => {
              if (resultado) {
                this.limparFormulario();

                this.resultadoPedidoMovimentar.emit(modal_resultado);

                this._toastService.exibir(ToastEstiloEnum.Success, "Pedido alterado com sucesso!");
              } else {
                this.resultadoPedidoMovimentar.emit(ModalResultadoEnum.Erro);
              }
            });
          }
        } else {
          this.resultadoPedidoMovimentar.emit(ModalResultadoEnum.Erro);

          this._toastService.exibir(ToastEstiloEnum.Danger, "Campos inválidos!");
        }

        break;
      default:
        this.resultadoPedidoMovimentar.emit(modal_resultado);

        break;
    }
  }

  selecionarPedidoStatus() {
    this.pedidoStatusSelecionado = null;

    if (this.f["id_pedido_status"].value != null && this.f["id_pedido_status"].value != "") {
      const pedidoStatusSelecionado: PedidoStatus | undefined = this.pedidosStatus.find(pedidoStatus => pedidoStatus.id == this.f["id_pedido_status"].value);

      if (pedidoStatusSelecionado != null) {
        this.pedidoStatusSelecionado = pedidoStatusSelecionado;

        if (this.pedidoStatusSelecionado.id == PedidoStatusEnum.Entregue) {
          this.f["dt_entrega"].addValidators(Validators.required)
          this.f["dt_entrega"].setValue(this.dataHoje);
        } else {
          this.f["dt_entrega"].setValue(null);
        }

        this.formulario.updateValueAndValidity();
      }
    }
  }
}
