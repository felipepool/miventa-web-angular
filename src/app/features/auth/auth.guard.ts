import { inject } from '@angular/core';
import { CanActivateChildFn, Router } from '@angular/router';
import { toObservable } from '@angular/core/rxjs-interop';
import { filter, map, take } from 'rxjs';
import { AuthService } from './auth.service';

export const authGuard: CanActivateChildFn = () => {
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
        ? true
        : router.createUrlTree(['/login']);
    }),
  );
};
