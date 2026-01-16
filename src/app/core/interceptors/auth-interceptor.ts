import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { finalize } from 'rxjs';

// Features

import { LoadingService } from '../../features/loading/services/loading-service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  let _loadingService = inject(LoadingService);

  const token = localStorage.getItem("token");

  _loadingService.incrementarRequisicao();

  _loadingService.exibir.set(true);

  if (token != null) {
    const requisicao = req.clone({
      setHeaders: {
        Authorization: "Bearer " + token
      }
    });

    if (_loadingService.qtdeRequisicoes() > 0) {
      _loadingService.exibir.set(true);
    }

    return next(requisicao)
            .pipe(
              finalize(() => {
                _loadingService.decrementarRequisicao();

              _loadingService.exibir.set(_loadingService.qtdeRequisicoes() > 0);
            })
          );
  }

  return next(req)
          .pipe(
            finalize(() => {
              _loadingService.decrementarRequisicao();

            _loadingService.exibir.set(_loadingService.qtdeRequisicoes() > 0);
          })
        );
};
