import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgbTooltip } from '@ng-bootstrap/ng-bootstrap';

// Features

import { AuthService } from '../../../features/auth/services/auth-service';
import { NotificacaoContainer } from "../../../features/notificacoes/components/notificacao/notificacao-container";
import { NotificacaoService } from '../../../features/notificacoes/services/notificacao-service';

// Shared

import { DADOS } from '../../constants/dados.constant';

@Component({
  selector: 'app-menu-superior',
  imports: [
    CommonModule,
    NgbTooltip,
    RouterLink,

    NotificacaoContainer
],
  templateUrl: './menu-superior.html',
  styleUrl: './menu-superior.css',
})

export class MenuSuperior {
  private readonly _router = inject(Router);

  private readonly _authService = inject(AuthService);
  private readonly _notificacaoService = inject(NotificacaoService);

  // Empresa

  empresaNome: string = DADOS.EMPRESA_NOME;

  // Notificação

  notificacaoExibir: boolean = false;
  notificacaoQtdeNaoLida = signal<number | null>(null);

  // Usuário

  usuarioNome: string | null = null;

  constructor() {
    this.usuarioNome = this._authService.obterNomeUsuario();
  }

  ngOnInit() {
    this.notificacaoQtdeNaoLida = this._notificacaoService.notificacaoQtdeNaoLida;
  }

  notificacao() {
    this.notificacaoExibir = !this.notificacaoExibir;
  }

  receberNotificacaoFechar(resultado: boolean) {
    this.notificacaoExibir = resultado;
  }

  sair() {
    this._authService.logout().subscribe(() => {
      this._router.navigate(["/auth"]);
    });
  }
}
