import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

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

  usuarios: Usuario[] = [];

  constructor() { }

  incluir() {
    this._router.navigate(["/home/usuario-cadastrar"]);
  }
}
