export interface LoginResponse {
  negocio:        Negocio;
  usuario:        Usuario;
  sucursalActiva: Sucursal;
  sucursales:     Sucursal[];
}

export interface Negocio {
  id:          string;
  codigo:      string;
  razonSocial: string;
}

export interface Sucursal {
  id:     string;
  codigo: string;
  nombre: string;
}

export interface Usuario {
  id:            string;
  nombreUsuario: string;
  email:         null;
  nombre:        string;
  apellido:      string;
  rol:           string;
  propietario:   boolean;
  activo:        boolean;
  createdAt:     Date;
  updatedAt:     Date;
}
