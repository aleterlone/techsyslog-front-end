import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

// Features

import { PedidoService } from '../../services/pedido-service';

// Models

import { Endereco } from '../../../enderecos/models/endereco';
import { PedidoSintetico } from '../../models/pedido-sintetico';

// Shared

import { formatarNumeroDecimal } from '../../../../shared/formatters';
import { PaginaTitulo } from '../../../../shared/components/pagina-titulo/pagina-titulo';
import { REGEX } from '../../../../shared/constants';
import { ToastEstilo } from '../../../../shared/enums';
import { ToastService } from '../../../../shared/components/toasts/services/toast-service';
import { validarNumeroDecimal } from '../../../../shared/validators';
import { ValorMonetarioDirective } from '../../../../shared/directives/valor-monetario';

@Component({
  selector: 'app-pedido-cadastrar',
  imports: [
    NgbDatepickerModule,
    ReactiveFormsModule,

    PaginaTitulo,
    ValorMonetarioDirective
  ],
  templateUrl: './pedido-cadastrar.html',
  styleUrl: './pedido-cadastrar.css',
})

export class PedidoCadastrar {
  private readonly _formBuilder = inject(FormBuilder);
  private readonly _router = inject(Router);

  private readonly _pedidoService = inject(PedidoService);

  private readonly _toastService = inject(ToastService);

  // Formulários

  formularioEndereco!: FormGroup;
  formularioPedidoSintetico!: FormGroup;

  formularioEnviado: boolean = false;

  constructor() {
    const hoje = new Date();

    const dataHoje = {
      year: hoje.getFullYear(),
      month: hoje.getMonth() + 1,
      day: hoje.getDate()
    };

    this.formularioEndereco = this._formBuilder.group({
      cep: ["", [Validators.required, Validators.pattern(REGEX.CEP)]],
      logradouro: ["", [Validators.required, Validators.minLength(3)]],
      numero: ["", Validators.required],
      complemento: [""],
      bairro: ["", [Validators.required, Validators.minLength(3)]],
      cidade: ["", [Validators.required, Validators.minLength(3)]],
      estado: ["", [Validators.required, Validators.minLength(2)]]
    });

    this.formularioPedidoSintetico = this._formBuilder.group({
      nro_pedido: [{ value: 0, disabled: true }],
      dt_cadastro: [dataHoje, Validators.required],
      nome: ["", [Validators.required, Validators.minLength(3)]],
      descricao: ["", [Validators.required, Validators.minLength(3)]],
      valor_total: ["", Validators.required]
    }, {
      validators: validarNumeroDecimal("valor_total")
    });
  }

  get fe() {
    return this.formularioEndereco.controls;
  }

  get fp() {
    return this.formularioPedidoSintetico.controls;
  }

  definirPedidoSintetico() {
    return new Observable<PedidoSintetico>((observer) => {
      let complemento: string | null = null;

      if (this.fe["complemento"].value != null && this.fe["complemento"].value != "") {
        complemento = this.fe["complemento"].value.toString().trim();
      }

      const enderecoEntrega: Endereco = {
        cep: this.fe["cep"].value.toString(),
        logradouro: this.fe["logradouro"].value.toString().trim(),
        numero: this.fe["numero"].value.toString().trim(),
        complemento: complemento,
        bairro: this.fe["bairro"].value.toString().trim(),
        cidade: this.fe["cidade"].value.toString().trim(),
        estado: this.fe["estado"].value.toString().trim()
      };

      const pedidoSintetico: PedidoSintetico = {
        id: null,
        nroPedido: null,
        dataCadastro: new Date(),
        dataEntrega: null,
        descricao: this.fp["email"].value.toString().trim(),
        valorTotal: formatarNumeroDecimal(this.fp["valor_total"].value),
        enderecoEntrega: enderecoEntrega
      }

      observer.next(pedidoSintetico);
      observer.complete();
    });
  }

  limparFormulario() {
    this.formularioEndereco.reset();
    this.formularioPedidoSintetico.reset();
  }

  salvar() {
    this.formularioEnviado = true;

    if (!this.formularioEndereco.valid || !this.formularioPedidoSintetico.valid) {
      this._toastService.exibir(ToastEstilo.Danger, "Campos inválidos!");

      return;
    }

    this.definirPedidoSintetico().subscribe((pedidoSinteticoDefinido) => {
      this._pedidoService.incluir(pedidoSinteticoDefinido).subscribe((resultado) => {
        if (resultado != null) {
          this.limparFormulario();

          this._toastService.exibir(ToastEstilo.Danger, "Pedido incluído com sucesso!");
        }
      });
    });
  }

  voltar() {
    this._router.navigate(["/home/pedido-listar"]);
  }
}
