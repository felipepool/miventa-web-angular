import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { catchError, Observable, of, switchMap, tap, throwError } from 'rxjs';
import { LoginResponse } from './interface/auth.response.interface';
import { LoginRequest } from './interface/auth.request.interface';

import { environment } from '../../../environments/environment';
import { AuthStore } from './auth.store';
import { rxResource } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';

@Service()
export class AuthService {

  httpClient = inject(HttpClient)
  authStore = inject(AuthStore)
  router = inject(Router)

  readonly sesionResource = rxResource({
    stream: () =>
      this.httpClient.get<LoginResponse>(
        `${environment.baseUrl}/v1/auth/me`,
        {
          withCredentials: true,
          timeout: 10000,
        }
      ).pipe(
        tap(response => this.authStore.establecerSesion(response)),
        catchError((error: unknown) => {
          if (error instanceof HttpErrorResponse && error.status === 401) {
            this.authStore.limpiarSesion();
            return of(null);
          }

          return throwError(() => error);
        })
      ),
  });

  private obtenerCsrf(): Observable<void> {
    return this.httpClient.get<void>(`${environment.baseUrl}/v1/auth/csrf`, {
      withCredentials: true
    });
  }

  login(request: LoginRequest): Observable<LoginResponse> {
    return this.obtenerCsrf().pipe(
      switchMap(() =>
          this.httpClient.post<LoginResponse>(
            `${environment.baseUrl}/v1/auth/login`,
            request,
            { withCredentials: true }
          )

      ),
      tap((response) => this.authStore.establecerSesion(response))
    );
  }

  logout(): Observable<void> {
  return this.httpClient.post<void>(
    `${environment.baseUrl}/v1/auth/logout`,
    {},
    { withCredentials: true }
  ).pipe(
    tap(() => {
      this.authStore.limpiarSesion();
      this.sesionResource.set(null);
    })
  );
}

}
