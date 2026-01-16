import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})

export class LoadingService {
  exibir = signal<boolean>(false);

  qtdeRequisicoes = signal<number>(0);

  decrementarRequisicao() {
    this.qtdeRequisicoes.update(r => r - 1);
  }

  incrementarRequisicao() {
    this.qtdeRequisicoes.update(r => r + 1);
  }
}
