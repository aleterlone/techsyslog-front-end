import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

// Shared

import { DADOS } from '../../constants/dados.constant';

@Component({
  selector: 'app-menu-superior',
  imports: [
    RouterLink
  ],
  templateUrl: './menu-superior.html',
  styleUrl: './menu-superior.css',
})

export class MenuSuperior {
  private readonly _router = inject(Router);

  empresaNome: string = DADOS.EMPRESA_NOME;

  constructor() { }

  sair() {
    this._router.navigate(["/login"]);
  }
}
