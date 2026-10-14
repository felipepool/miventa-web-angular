export interface CategoriaResponse {
  id:          string;
  nombre:      string;
  descripcion: string;
  activo:      boolean;
  createdAt:   string;
  updatedAt:   string;
}

export interface CategoriaRequest {
  nombre: string;
  descripcion?: string | null;
}

export interface CategoriaFormData {
  nombre: string;
  descripcion: string;
  activo: boolean
}
