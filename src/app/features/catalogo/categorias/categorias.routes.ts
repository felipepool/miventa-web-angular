import { Routes } from "@angular/router";

export const categoriasRoute: Routes = [
    { path: 'catalogo/categorias', loadComponent: () => import('./pages/categorias-page/categorias-page').then(m => m.CategoriasPage) }
]
