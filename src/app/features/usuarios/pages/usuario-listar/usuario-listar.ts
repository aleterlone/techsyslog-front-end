import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgbTooltip } from '@ng-bootstrap/ng-bootstrap';

// Features

import { UsuarioService } from '../../services/usuario-service';

// Models

import { Usuario } from '../../models/usuario';

// Shared

import { PaginaTitulo } from '../../../../shared/components/pagina-titulo/pagina-titulo';
import { ToastEstiloEnum } from '../../../../shared/enums';
import { ToastService } from '../../../../shared/components/toasts/services/toast-service';

@Component({
  selector: 'app-usuario-listar',
  imports: [
    CommonModule,
    NgbTooltip,

    PaginaTitulo
  ],
  templateUrl: './usuario-listar.html',
  styleUrl: './usuario-listar.css',
})

export class UsuarioListar {
  private readonly _router = inject(Router);

  private readonly _usuarioService = inject(UsuarioService);

  private readonly _toastService = inject(ToastService);

  usuarios = signal<Usuario[]>([]);

  constructor() { }

  ngOnInit() {
    this.obterDados();
  }

  alterar() {
    this._toastService.exibir(ToastEstiloEnum.Success, "Em breve...");
  }

  incluir() {
    this._router.navigate(["/home/usuario-cadastrar"]);
  }

  obterDados() {
    this._usuarioService.obter().subscribe((resultado) => {
      this.usuarios.set(resultado);
    });
  }
}
