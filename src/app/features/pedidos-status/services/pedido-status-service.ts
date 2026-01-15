import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';

// Core

import { HttpErrorHandlerService } from '../../../core/handlers/http/http-error-handler-service';

// Environments

import { environment } from '../../../../environments/development.environment';

// Models

import { PedidoStatus } from '../models/pedido-status';

@Injectable({
  providedIn: 'root',
})

export class PedidoStatusService {
  private readonly _http = inject(HttpClient);

  private readonly _httpErrorHandlerService = inject(HttpErrorHandlerService);

  constructor() { }

  obter(): Observable<PedidoStatus[]> {
    return this._http.get<PedidoStatus[]>(environment.urlAPI + "/pedido-status/obter")
      .pipe(
        catchError((error) => {
          this._httpErrorHandlerService.handlerError(error);

          return of([]);
        })
      );
  }
}
