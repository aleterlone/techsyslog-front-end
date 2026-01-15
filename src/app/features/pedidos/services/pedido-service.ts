import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';

// Core

import { HttpErrorHandlerService } from '../../../core/handlers/http/http-error-handler-service';

// Environments

import { environment } from '../../../../environments/development.environment';

// Models

import { PedidoSintetico } from '../models/pedido-sintetico';

@Injectable({
  providedIn: 'root',
})

export class PedidoService {
  private readonly _http = inject(HttpClient);

  private readonly _httpErrorHandlerService = inject(HttpErrorHandlerService);

  constructor() { }

	alterarPedidoStatusPorId(id: string, id_pedido_status: string, data_entrega: Date | null): Observable<boolean> {
		const requisicao: {} = {
			id: id,
			idPedidoStatus: id_pedido_status,
			dataEntrega : data_entrega
		};

		return this._http.put<boolean>(environment.urlAPI + "/pedido/alterar-pedido-status-por-id", requisicao)
			.pipe(
				catchError((error) => {
					this._httpErrorHandlerService.handlerError(error);

					return of(false);
				})
			);
	}

  incluir(pedido_sintetico: PedidoSintetico): Observable<PedidoSintetico | null> {
		return this._http.post<PedidoSintetico | null>(environment.urlAPI + "/pedido/incluir", pedido_sintetico)
			.pipe(
				catchError((error) => {
					this._httpErrorHandlerService.handlerError(error);

					return of(null);
				})
			);
  }

  obter(): Observable<PedidoSintetico[]> {
		return this._http.get<PedidoSintetico[]>(environment.urlAPI + "/pedido/obter")
			.pipe(
				catchError((error) => {
					this._httpErrorHandlerService.handlerError(error);

					return of([]);
				})
			);
  }
}
