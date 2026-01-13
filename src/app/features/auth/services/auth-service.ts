import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, of, tap } from 'rxjs';

// Core

import { HttpErrorHandlerService } from '../../../core/handlers/http/http-error-handler-service';

// Models

import { AuthToken } from '../models/auth-token';

// Shared

import { environment } from '../../../../environments/development.environment';

@Injectable({
  providedIn: 'root',
})

export class AuthService {
  private readonly _http = inject(HttpClient);

  private readonly _httpErrorHandlerService = inject(HttpErrorHandlerService);

  constructor() { }

  login(): Observable<boolean> {
    return this._http.get<AuthToken>(environment.urlAPI + "/pedido/obter")
      .pipe(
        tap((resultado) => {
          if (resultado != null && resultado.token != null) {
            localStorage.setItem("token", resultado.token)
          }
        }),
        map((resultado) => {
          if (resultado != null && resultado.token != null) {
            return true;
          }

          return false;
        }),
        catchError((error) => {
          this._httpErrorHandlerService.handlerError(error);

          return of(false);
        })
      );
  }

  logout(): Observable<null> {
    return new Observable<null>((observer) => {
      localStorage.removeItem("token");

      observer.next(null);
      observer.complete();
    });
  }
}
