import { HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

// Shared

import { ToastEstilo } from '../../../shared/enums';
import { ToastService } from '../../../shared/components/toasts/services/toast-service';

@Injectable({
  providedIn: 'root',
})

export class HttpErrorHandlerService {
  private readonly _toastService = inject(ToastService);

  handlerError(error: HttpErrorResponse)  {
    console.log(error);

    this._toastService.exibir(ToastEstilo.Danger, "Houve um erro...");
  }
}
