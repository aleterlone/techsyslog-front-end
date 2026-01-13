import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

// Features

import { UsuarioService } from '../../services/usuario-service';

// Models

import { Usuario } from '../../models/usuario';

// Shared

import { PaginaTitulo } from '../../../../shared/components/pagina-titulo/pagina-titulo';

@Component({
  selector: 'app-usuario-listar',
  imports: [
    PaginaTitulo
  ],
  templateUrl: './usuario-listar.html',
  styleUrl: './usuario-listar.css',
})

export class UsuarioListar {
  private readonly _router = inject(Router);

  private readonly _usuarioService = inject(UsuarioService);

  usuarios: Usuario[] = [];

  constructor() { }

  ngOnInit() {
    this.obterDados();
  }

  incluir() {
    this._router.navigate(["/home/usuario-cadastrar"]);
  }

  obterDados() {
    this._usuarioService.obter().subscribe((resultado) => {
      this.usuarios = resultado;
    });
  }
}
