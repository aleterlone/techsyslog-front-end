import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { finalize } from 'rxjs';

// Features

import { LoadingService } from '../../features/loading/services/loading-service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  let _loadingService = inject(LoadingService);

  const token = localStorage.getItem("token");

  let qtdeRequisicoes: number = 0;

  if (token != null) {
    const requisicao = req.clone({
      setHeaders: {
        Authorization: "Bearer " + token
      }
    });

    qtdeRequisicoes++;

    if (qtdeRequisicoes > 0) {
      _loadingService.exibir.set(true);
    }

    return next(requisicao)
            .pipe(
              finalize(() => {
                qtdeRequisicoes--;

              _loadingService.exibir.set(qtdeRequisicoes > 0);
            })
          );
  }

  return next(req);
};
