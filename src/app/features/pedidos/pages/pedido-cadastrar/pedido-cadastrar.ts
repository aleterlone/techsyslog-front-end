import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

// Features

import { EnderecoService } from '../../../enderecos/services/endereco-service';
import { PedidoService } from '../../services/pedido-service';

// Models

import { Endereco } from '../../../enderecos/models/endereco';
import { PedidoSintetico } from '../../models/pedido-sintetico';

// Shared

import { formatarNumeroDecimal } from '../../../../shared/formatters';
import { PaginaTitulo } from '../../../../shared/components/pagina-titulo/pagina-titulo';
import { REGEX } from '../../../../shared/constants';
import { ToastEstiloEnum } from '../../../../shared/enums';
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

  private readonly _enderecoService = inject(EnderecoService);
  private readonly _pedidoService = inject(PedidoService);

  private readonly _toastService = inject(ToastService);

  // Data (Hoje)

  hoje = new Date();

  dataHoje = {
    year: this.hoje.getFullYear(),
    month: this.hoje.getMonth() + 1,
    day: this.hoje.getDate()
  };

  // Formulários

  formularioEndereco!: FormGroup;
  formularioPedidoSintetico!: FormGroup;

  formularioEnviado: boolean = false;

  constructor() {
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
      dt_cadastro: [this.dataHoje, Validators.required],
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
        cep: this.fe["cep"].value.replaceAll("-", "").toString(),
        logradouro: this.fe["logradouro"].value.toString().trim(),
        numero: this.fe["numero"].value.toString().trim(),
        complemento: complemento,
        bairro: this.fe["bairro"].value.toString().trim(),
        cidade: this.fe["cidade"].value.toString().trim(),
        estado: this.fe["estado"].value.toString().trim().toUpperCase()
      };

      const pedidoSintetico: PedidoSintetico = {
        id: null,
        nroPedido: null,
        dataCadastro: new Date(),
        dataEntrega: null,
        nome: this.fp["nome"].value.toString().trim(),
        descricao: this.fp["descricao"].value.toString().trim(),
        valorTotal: formatarNumeroDecimal(this.fp["valor_total"].value),
        enderecoEntrega: enderecoEntrega,
        status: null
      }

      observer.next(pedidoSintetico);
      observer.complete();
    });
  }

  limparFormulario() {
    this.formularioEndereco.reset();
    this.formularioPedidoSintetico.reset();

    this.formularioEnviado = false;

    this.fp["dt_cadastro"].setValue(this.dataHoje);
  }

  limparFormularioEndereco() {
    this.formularioEndereco.reset();
  }

  obterEndereco() {
    if (
      this.fe["cep"].value != null &&
      this.fe["cep"].value.trim() != "" &&
      this.fe["cep"].errors == null
    ) {
      this._enderecoService.obterPorCep(this.fe["cep"].value).subscribe((resultado) => {
        if (resultado != null) {
          this.transferirEndereco(resultado);
        } else {
          this.limparFormularioEndereco();

          this._toastService.exibir(ToastEstiloEnum.Danger, "CEP inválido!");
        }
      });
    } else {
      this.limparFormularioEndereco();
    }
  }

  salvar() {
    this.formularioEnviado = true;

    if (!this.formularioEndereco.valid || !this.formularioPedidoSintetico.valid) {
      this._toastService.exibir(ToastEstiloEnum.Danger, "Campos inválidos!");

      return;
    }

    this.definirPedidoSintetico().subscribe((pedidoSinteticoDefinido) => {
      this._pedidoService.incluir(pedidoSinteticoDefinido).subscribe((resultado) => {
        if (resultado != null) {
          this.limparFormulario();

          this._toastService.exibir(ToastEstiloEnum.Success, "Pedido incluído com sucesso! Nro Pedido: " + resultado.nroPedido);
        }
      });
    });
  }

  transferirEndereco(endereco: Endereco) {
    this.fe["cep"].setValue(endereco.cep);
    this.fe["logradouro"].setValue(endereco.logradouro);
    this.fe["complemento"].setValue(endereco.complemento);
    this.fe["bairro"].setValue(endereco.bairro);
    this.fe["cidade"].setValue(endereco.cidade);
    this.fe["estado"].setValue(endereco.estado);
  }

  voltar() {
    this._router.navigate(["/home/pedido-listar"]);
  }
}
