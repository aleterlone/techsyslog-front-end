import { Injectable, signal } from '@angular/core';
import * as signalR from '@microsoft/signalr';

// Environments

import { environment } from '../../../../environments/development.environment';

// Models

import { Notificacao } from '../models/notificacao';

@Injectable({
  providedIn: 'root',
})

export class NotificacaoService {
  // Notificações

  notificacoes = signal<Notificacao[]>([]);

  notificacaoQtdeNaoLida = signal<number | null>(null);

  // Hub

  private hub: signalR.HubConnection | null = null;

	// Hub

  conectar() {
    if (this.hub == null) {
      this.hub = new signalR
                      .HubConnectionBuilder()
                      .withUrl(environment.urlHUB + "/notificacao")
                      .withAutomaticReconnect()
                      .build();

      this.hub.start();

      this.hub?.on("Notificacao", (notificacao: Notificacao) => {
        this.notificacoes.update(n => [notificacao, ...n]);

        const qtde: number = this.notificacoes().filter(n => !n.lida).length;

        if (qtde > 0) {
          this.notificacaoQtdeNaoLida.set(qtde);
        } else {
          this.notificacaoQtdeNaoLida.set(null);
        }
      });
    }
  }

  desconectar() {
    this.hub?.stop();
  }
}
