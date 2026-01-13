import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

// Features

import { AuthService } from '../../../features/auth/services/auth-service';

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

  private readonly _authService = inject(AuthService);

  empresaNome: string = DADOS.EMPRESA_NOME;

  constructor() { }

  sair() {
    this._authService.logout().subscribe(() => {
      this._router.navigate(["/login"]);
    })
  }
}
