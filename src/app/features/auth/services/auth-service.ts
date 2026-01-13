import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, of, tap } from 'rxjs';

// Core

import { HttpErrorHandlerService } from '../../../core/handlers/http/http-error-handler-service';
import { StorageService } from '../../../core/storages/storage-service';

// Models

import { AuthLogin } from '../models/auth-login';
import { AuthToken } from '../models/auth-token';

// Shared

import { environment } from '../../../../environments/development.environment';

@Injectable({
  providedIn: 'root',
})

export class AuthService {
  private readonly _http = inject(HttpClient);

  private readonly _storageService = inject(StorageService);
  private readonly _httpErrorHandlerService = inject(HttpErrorHandlerService);

  constructor() { }

  login(auth_login: AuthLogin): Observable<boolean> {
    return this._http.post<AuthToken>(environment.urlAPI + "/auth/login", auth_login)
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

  obterStatus(): boolean {
    const token: string | null | undefined = this._storageService.obter("token");

    if (token != null && this.validarToken(token)) {
      return true;
    }

    return false;
  }

  validarToken(token: string): boolean {
    let payload = JSON.parse(atob(token.split(".")[1]));

    const expiracao = payload.exp;

    const agora = Math.floor(Date.now() / 1000);

    return expiracao > agora;
  }
}
