import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

// Shared

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
      descricao: [""],
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

  salvar() {
    this.formularioEnviado = true;

    if (!this.formularioEndereco.valid || !this.formularioPedidoSintetico.valid) {
      this._toastService.exibir(ToastEstilo.Danger, "Campos inválidos!");

      return;
    }
  }

  voltar() {
    this._router.navigate(["/home/pedido-listar"]);
  }
}
