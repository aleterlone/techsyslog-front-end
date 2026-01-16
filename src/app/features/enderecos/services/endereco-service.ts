import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';

// Core

import { HttpErrorHandlerService } from '../../../core/handlers/http/http-error-handler-service';

// Environments

import { environment } from '../../../../environments/development.environment';

// Models

import { Endereco } from '../models/endereco';

@Injectable({
  providedIn: 'root',
})

export class EnderecoService {
  private readonly _http = inject(HttpClient);

  private readonly _httpErrorHandlerService = inject(HttpErrorHandlerService);

  constructor() { }

  obterPorCep(cep: string): Observable<Endereco | null> {
		const parametros = new HttpParams()
			.set("cep", cep);

    return this._http.get<Endereco | null>(environment.urlAPI + "/endereco/obter-por-cep", { params: parametros })
      .pipe(
        catchError((error) => {
          this._httpErrorHandlerService.handlerError(error);

          return of(null);
        })
      );
  }
}
