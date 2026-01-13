import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';

// Core

import { HttpErrorHandlerService } from '../../../core/handlers/http/http-error-handler-service';

// Environments

import { environment } from '../../../../environments/development.environment';

// Models

import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root',
})

export class UsuarioService {
  private readonly _http = inject(HttpClient);

  private readonly _httpErrorHandlerService = inject(HttpErrorHandlerService);

  constructor() { }

  incluir(usuario: Usuario): Observable<Usuario | null> {
    return this._http.post<Usuario | null>(environment.urlAPI + "/usuario/incluir", usuario)
      .pipe(
        catchError((error) => {
          this._httpErrorHandlerService.handlerError(error);

          return of(null);
        })
      );
  }

  obter(): Observable<Usuario[]> {
		return this._http.get<Usuario[]>(environment.urlAPI + "/usuario/obter")
			.pipe(
				catchError((error) => {
					this._httpErrorHandlerService.handlerError(error);

					return of([]);
				})
			);
  }
}
