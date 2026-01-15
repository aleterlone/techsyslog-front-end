import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

// Features

import { AuthService } from '../../features/auth/services/auth-service';

export const homeGuard: CanActivateFn = (route, state) => {
  const _router = inject(Router);

  const _authService = inject(AuthService);

  if (_authService.obterStatus()) {
    return true;
  }

  _router.navigate(["/auth"]);


  return false;
};
