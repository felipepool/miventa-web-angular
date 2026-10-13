export interface SubMenu {
  readonly id: string;
  readonly nombre: string;
  readonly icono?: string;
  readonly ruta: string;
}

export interface Menu {
  readonly id: string;
  readonly nombre: string;
  readonly icono?: string;
  readonly ruta?: string;
  readonly submenus: readonly SubMenu[];
}
