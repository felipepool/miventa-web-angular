import { Routes } from '@angular/router';
import { MainLayout } from './layouts/main-layout/main-layout';
import { authGuard } from './features/auth/auth.guard';
import { guestGuard } from './features/auth/guest.guard';

export const routes: Routes = [
  {
    path: 'login',
    canActivate: [guestGuard],
    loadComponent: () => import('./features/auth/login-page/login-page').then(m => m.LoginPage) },

  {
    path: '',
    component: MainLayout,
    canActivateChild: [ authGuard ],
    children: [
        { path: 'dashboard', loadComponent: () => import('./features/dashboard/pages/dashboard-page/dashboard-page').then(m => m.DashboardPage) },
        { path: '', loadChildren: () => import('./features/catalogo/categorias/categorias.routes').then(m => m.categoriasRoute), }
    ]
  },
];
