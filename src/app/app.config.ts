import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withXsrfConfiguration } from '@angular/common/http';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { crearPaginadorEspanol } from './core/interfaces/i18n/paginator-es';
import { MAT_DIALOG_DEFAULT_OPTIONS, MatDialogConfig } from '@angular/material/dialog';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(
      withXsrfConfiguration({
        cookieName: 'XSRF-TOKEN',
        headerName: 'X-XSRF-TOKEN'
      })
    ),
    {
      provide: MatPaginatorIntl,
      useFactory: crearPaginadorEspanol,
    },
    {
      provide: MAT_DIALOG_DEFAULT_OPTIONS,
      useValue: {
        ...new MatDialogConfig<unknown>(),
        position: {
          top: 'clamp(16px, 10dvh, 96px)',
        },
        maxWidth: 'calc(100vw - 32px)',
        maxHeight: 'calc(90dvh - 32px)',
      },
    }
  ]
};
