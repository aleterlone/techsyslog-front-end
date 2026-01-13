import { Component, inject, Input, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

// Features

import { UsuarioService } from '../../services/usuario-service';

// Models

import { Usuario } from '../../models/usuario';

// Shared

import { PaginaTitulo } from '../../../../shared/components/pagina-titulo/pagina-titulo';
import { ToastEstilo } from '../../../../shared/enums';
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
        email: this.f["email"].value.toString().trim().toUpperCase(),
        senha: this.f["senha"].value
      }

      observer.next(usuario);
      observer.complete();
    });
  }

  limparFormulario() {
    this.formulario.reset();
  }

  salvar() {
    this.formularioEnviado = true;

    if (!this.formulario.valid) {
      this._toastService.exibir(ToastEstilo.Danger, "Campos inválidos!");

      return;
    }

    this.definirUsuario().subscribe((usuarioDefinido) => {
      this._usuarioService.incluir(usuarioDefinido).subscribe((resultado) => {
        if (resultado != null) {
          this.limparFormulario();

          this._toastService.exibir(ToastEstilo.Danger, "Cliente incluído com sucesso!");
        }
      })
    });
  }

  voltar() {
    this._router.navigate(["/login"]);
  }
}
