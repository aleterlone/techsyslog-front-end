import { Component, inject, Input, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

// Features

import { AuthService } from '../../../auth/services/auth-service';
import { UsuarioService } from '../../services/usuario-service';

// Models

import { Usuario } from '../../models/usuario';

// Shared

import { PaginaTitulo } from '../../../../shared/components/pagina-titulo/pagina-titulo';
import { ToastEstiloEnum } from '../../../../shared/enums';
import { ToastService } from '../../../../shared/components/toasts/services/toast-service';
import { ValoresIguaisValidator } from '../../../../shared/validators/valores.iguais.validator';

@Component({
  selector: 'app-usuario-cadastrar',
  imports: [
    ReactiveFormsModule,

    PaginaTitulo
  ],
  templateUrl: './usuario-cadastrar.html',
  styleUrl: './usuario-cadastrar.css',
})

export class UsuarioCadastrar {
  private readonly _formBuilder = inject(FormBuilder);
  private readonly _router = inject(Router);

  private readonly _authService = inject(AuthService);
  private readonly _usuarioService = inject(UsuarioService);

  private readonly _toastService = inject(ToastService);

  // Formulário

  formulario!: FormGroup;

  formularioEnviado: boolean = false;

  // Título

  titulo: string = "Usuários (Cadastrar)";

  @Input() cadastroExterno: boolean = false;

  constructor() {
    this.formulario = this._formBuilder.group({
      nome: ["", [Validators.required, Validators.minLength(3)]],
      email: ["", [Validators.required, Validators.email]],
      senha: ["", [Validators.required, Validators.minLength(6)]],
      senha_confirmar: ["", [Validators.required, Validators.minLength(6)]]
    }, {
      validators: ValoresIguaisValidator("senha", "senha_confirmar")
    });
  }

  ngOnChanges(alteracoes: SimpleChanges) {
    if (alteracoes.hasOwnProperty("cadastroExterno")) {
      if (this.cadastroExterno) {
        this.titulo = "Novo cadastro";
      }
    }
  }

  get f() {
    return this.formulario.controls;
  }

  definirUsuario(): Observable<Usuario> {
    return new Observable<Usuario>((observer) => {
      const usuario: Usuario = {
        id: null,
        nome: this.f["nome"].value.toString().trim(),
        email: this.f["email"].value.toString().trim().toLowerCase(),
        senha: this.f["senha"].value
      }

      observer.next(usuario);
      observer.complete();
    });
  }

  limparFormulario() {
    this.formulario.reset();

    this.formularioEnviado = false;
  }

  salvar() {
    this.formularioEnviado = true;

    if (!this.formulario.valid) {
      this._toastService.exibir(ToastEstiloEnum.Danger, "Campos inválidos!");

      return;
    }

    this.definirUsuario().subscribe((usuarioDefinido) => {
      if (this.cadastroExterno) {
        this._authService.incluir(usuarioDefinido).subscribe((resultado) => {
          if (resultado != null) {
            this._router.navigate(["/auth/login"]);

            this._toastService.exibir(ToastEstiloEnum.Success, "Cadastro realizado com sucesso!");
          }
        });
      } else {
        this._usuarioService.incluir(usuarioDefinido).subscribe((resultado) => {
          if (resultado != null) {
            this.limparFormulario();

            this._toastService.exibir(ToastEstiloEnum.Success, "Usuário incluído com sucesso!");
          }
        });
      }
    });
  }

  voltar() {
    if (this.cadastroExterno) {
      this._router.navigate(["/auth/login"]);
    } else {
      this._router.navigate(["/home/usuario-listar"]);
    }
  }
}
