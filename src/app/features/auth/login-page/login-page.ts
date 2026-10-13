import { Component, inject, signal } from '@angular/core';
import { form, FormRoot, FormField, required } from '@angular/forms/signals';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { LoginRequest } from '../interface/auth.request.interface';
import { AuthService } from '../auth.service';
import { firstValueFrom } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  imports: [
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    FormRoot,
    FormField
],
  templateUrl: './login-page.html',
  styleUrl: './login-page.scss',
})
export class LoginPage {

  authService = inject(AuthService)
  router = inject(Router)
  errorLogin = signal<string | null>(null);

  loginModel = signal<LoginRequest>({
    codigoNegocio: '',
    nombreUsuario: '',
    password: ''
  })

  loginForm = form(this.loginModel, (path) => {
    required(path.codigoNegocio, { message: 'El codigo de negocio es obligatorio' })
    required(path.nombreUsuario, { message: 'El usuario es obligatorio' })
    required(path.password, { message: 'El password es obligatorio' })
  },
    {
      submission: {
        onInvalid: () => {
          console.log('Formulario inválido');
        },
        action: async (field) => {
          this.errorLogin.set(null);

          try {
            const result = await firstValueFrom(
              this.doLogin(field().value())
            );

            // Aquí manejas el login exitoso.
            this.router.navigateByUrl('dashboard')

            return
          } catch (error: unknown) {
            const mensaje =
              error instanceof HttpErrorResponse
                ? error.status === 401
                  ? 'Credenciales inválidas. Revisa tus datos.'
                  : error.status === 0
                    ? 'No se pudo conectar con el servidor.'
                    : 'No se pudo iniciar sesión. Intenta nuevamente.'
                : 'Ocurrió un error inesperado.';

            this.errorLogin.set(mensaje);

            // Informa también a Signal Forms que el envío falló.
            return {
              kind: 'login',
              message: mensaje,
            };
          }
        }
      },
    },)

    doLogin(data: LoginRequest) {
      return this.authService.login(data)
    }

}
