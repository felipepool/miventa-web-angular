import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthStore } from './auth.store';
import { AuthService } from './auth.service';
import { toObservable } from '@angular/core/rxjs-interop';
import { filter, map, take } from 'rxjs';

export const guestGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  return toObservable(auth.sesionResource.status).pipe(
    filter(status =>
      status === 'resolved' ||
      status === 'local' ||
      status === 'error'
    ),
    take(1),
    map(status => {
      if (status === 'error') {
        console.error('No se pudo verificar la sesión', auth.sesionResource.error());
        return false;
      }

      return auth.authStore.autenticado()
        ? router.createUrlTree(['/dashboard'])
        : true;
    }),
  );
};
