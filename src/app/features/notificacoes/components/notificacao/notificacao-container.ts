import { Component, EventEmitter, inject, Input, Output, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';

// Features

import { NotificacaoService } from '../../services/notificacao-service';

// Models

import { Notificacao } from '../../models/notificacao';

@Component({
  selector: 'app-notificacao',
  imports: [
    CommonModule
  ],
  templateUrl: './notificacao-container.html',
  styleUrl: './notificacao-container.css',
})

export class NotificacaoContainer {
  private readonly _notificacaoService = inject(NotificacaoService);

  // Notificações

  notificacoes: WritableSignal<Notificacao[]> = this._notificacaoService.notificacoes;

  @Input() exibir: boolean = false;

  @Output() resultadoNotificacaoFechar = new EventEmitter<boolean>();

  ngOnInit() {
    this._notificacaoService.conectar();
  }

  fechar() {
    this.resultadoNotificacaoFechar.emit(false);
  }
}
