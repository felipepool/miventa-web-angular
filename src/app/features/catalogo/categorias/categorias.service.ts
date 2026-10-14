import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { CategoriaRequest, CategoriaResponse } from './categorias.interface';
import { environment } from '../../../../environments/environment';

@Service()
export class CategoriasService {

  http = inject(HttpClient)

  getAll() {
    return this.http.get<CategoriaResponse[]>(`${environment.baseUrl}/v1/catalogo/categorias`);
  }

  crear(request: CategoriaRequest) {
    return this.http.post<CategoriaRequest>(`${environment.baseUrl}/v1/catalogo/categorias`, request);
  }

}
