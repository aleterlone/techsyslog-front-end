import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

// Shared

import { ToastService } from '../../../../shared/components/toasts/services/toast-service';
import { ToastEstilo } from '../../../../shared/enums';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './login.html',
  styleUrl: './login.css',
})

export class Login {
  private readonly _formBuilder = inject(FormBuilder);
  private readonly _router = inject(Router);

  private readonly _toastService = inject(ToastService);

  // Formulário

  formulario!: FormGroup;

  formularioEnviado: boolean = false;

  constructor() {
    this.formulario = this._formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
      senha: ["", Validators.required]
    });
  }

  get f() {
    return this.formulario.controls;
  }

  entrar() {
    this.formularioEnviado = true;

    if (!this.formulario.valid) {
      this._toastService.exibir(ToastEstilo.Danger, "Campos inválidos!");

      return;
    }

    this._router.navigate(["/home"]);
  }

  novoCadastro() {
    this._router.navigate(["/login-cadastrar"]);
  }
}
