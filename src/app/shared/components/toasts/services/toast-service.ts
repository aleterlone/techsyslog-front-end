import { Injectable, signal } from '@angular/core';

// Models

import { ToastPadraoEstrutura } from '../models/toast-padrao-estrutura';

// Shared

import { DADOS } from '../../../constants/dados.constant';
import { ToastEstiloEnum } from '../../../enums';

@Injectable({
  providedIn: 'root',
})

export class ToastService {
  private readonly _toasts = signal<ToastPadraoEstrutura[]>([]);

  readonly toasts = this._toasts.asReadonly();

  exibir(toast_estilo: ToastEstiloEnum, body: string, delay?: number | null) {
    let toastPadraoEstrutura = new ToastPadraoEstrutura();

    toastPadraoEstrutura.class = "position-fixed top-0 end-0 m-1";

    switch (toast_estilo) {
      case ToastEstiloEnum.Danger:
        toastPadraoEstrutura.class += " bg-danger text-white";

        break;
      case ToastEstiloEnum.Success:
        toastPadraoEstrutura.class += " bg-success text-white";

        break;
      default:
        break;
    }

    toastPadraoEstrutura.header = DADOS.EMPRESA_NOME;
    toastPadraoEstrutura.body = body;
    toastPadraoEstrutura.delay = delay;

   this._toasts.update(t => [...t, toastPadraoEstrutura]);
  }

  remover(toast_atual: ToastPadraoEstrutura) {
    this._toasts.update(toast => toast.filter(t => t != toast_atual));
  }
}
