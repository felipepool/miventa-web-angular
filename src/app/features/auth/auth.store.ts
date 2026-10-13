import { computed, Service, signal } from '@angular/core';
import { LoginResponse, Negocio, Sucursal, Usuario } from './interface/auth.response.interface';

@Service()
export class AuthStore {

  private readonly _usuario = signal<Usuario | null>(null);
  private readonly _sucursal = signal<Sucursal | null>(null);
  private readonly _negocio = signal<Negocio | null>(null);

  readonly usuario = this._usuario.asReadonly()
  readonly sucursal = this._sucursal.asReadonly()
  readonly negocio = this._negocio.asReadonly()

  readonly autenticado = computed(() =>
    this._usuario() !== null
  );

   // Actualizar estado
    establecerSesion(response: LoginResponse): void {
    this._usuario.set(response.usuario);
    this._sucursal.set(response.sucursalActiva);
    this._negocio.set(response.negocio);
  }

  // Limpiar estado
  limpiarSesion(): void {
    this._usuario.set(null);
    this._sucursal.set(null);
    this._negocio.set(null);
  }

}
