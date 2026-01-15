import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem("token");

  if (token != null) {
    const requisicao = req.clone({
      setHeaders: {
        Authorization: "Bearer " + token
      }
    });

    return next(requisicao);
  }

  return next(req);
};
