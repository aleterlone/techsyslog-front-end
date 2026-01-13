import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

// Features

import { AuthService } from '../../features/auth/services/auth-service';

export const authGuard: CanActivateFn = (route, state) => {
  const _router = inject(Router);

  const _authService = inject(AuthService);

  console.log(_authService.obterStatus());

  if (_authService.obterStatus()) {
    return true;
  } else {
    return _router.parseUrl('/login');
  }
};
