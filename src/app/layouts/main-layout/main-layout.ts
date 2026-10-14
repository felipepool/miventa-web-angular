import { Component, inject, signal } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { firstValueFrom, map } from 'rxjs';
import { AuthService } from '../../features/auth/auth.service';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { Menu } from '../../core/interfaces/menu.interface';
import { AuthStore } from '../../features/auth/auth.store';



@Component({
  selector: 'app-main-layout',
  imports: [
      RouterOutlet,
      MatSidenavModule,
      MatToolbarModule,
      MatIconModule,
      MatMenuModule,
      MatButtonModule,
      RouterLink,
      RouterLinkActive],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.scss',
})
export class MainLayout {

  readonly expandedMenu = signal<string | null>(null);

  toggleMenu(id: string): void {
    this.expandedMenu.update(current => current === id ? null : id);
  }

  readonly menus = signal<readonly Menu[]>([
  {
    id: 'dashboard',
    nombre: 'Dashboard',
    icono: 'dashboard',
    ruta: '/dashboard',
    submenus: [],
  },
  {
    id: 'catalogo',
    nombre: 'Catalogo',
    icono: 'menu_book',
    submenus: [
      {
        id: 'categoria-list',
        nombre: 'Categorias',
        icono: 'list',
        ruta: 'catalogo/categorias',
      },
      {
        id: 'marca-list',
        nombre: 'Marcas',
        icono: 'list',
        ruta: 'catalogo/marcas',
      },
      {
        id: 'modificadores-list',
        nombre: 'Modificadores',
        icono: 'list',
        ruta: 'catalogo/modificadores',
      },
      {
        id: 'product-list',
        nombre: 'Productos',
        icono: 'list',
        ruta: 'catalogo/productos',
      },
    ]
  },
  {
    id: 'ventas',
    nombre: 'Ventas',
    icono: 'point_of_sale',
    submenus: [
      {
        id: 'nueva-venta',
        nombre: 'Nueva venta',
        icono: 'add_shopping_cart',
        ruta: '/ventas/nueva',
      },
      {
        id: 'historial-ventas',
        nombre: 'Historial',
        icono: 'receipt_long',
        ruta: '/ventas',
      },
    ],
  },
  {
    id: 'inventario',
    nombre: 'Inventario',
    icono: 'inventory_2',
    submenus: [
      {
        id: 'productos',
        nombre: 'Productos',
        icono: 'category',
        ruta: '/productos',
      },
    ],
  },
]);


readonly authStore = inject(AuthStore)
private readonly authService = inject(AuthService);
private readonly router = inject(Router);

readonly cerrandoSesion = signal(false);
readonly errorSesion = signal<string | null>(null);

async cerrarSesion(): Promise<void> {
  if (this.cerrandoSesion()) return;

  this.cerrandoSesion.set(true);
  this.errorSesion.set(null);

  try {
    await firstValueFrom(this.authService.logout());
    await this.router.navigateByUrl('/login', { replaceUrl: true });
  } catch {
    this.errorSesion.set(
      'No se pudo cerrar la sesión. Intenta nuevamente.'
    );
  } finally {
    this.cerrandoSesion.set(false);
  }
}

}
