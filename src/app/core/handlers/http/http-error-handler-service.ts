import { HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

// Shared

import { ToastEstiloEnum } from '../../../shared/enums';
import { ToastService } from '../../../shared/components/toasts/services/toast-service';

@Injectable({
  providedIn: 'root',
})

export class HttpErrorHandlerService {
  private readonly _toastService = inject(ToastService);

  handlerError(error: HttpErrorResponse)  {
    console.log(error);

    this._toastService.exibir(ToastEstiloEnum.Danger, "Houve um erro...");
  }
}
