import { Routes } from '@angular/router';
import { isNotAuthenticatedGuard } from './auth/guards/is-not-authenticated.guard';
import { IsAuthenticatedGuard } from './auth/guards/is-authenticated.guard';

const routes: Routes = [
  {
    path: 'auth',
    canActivate: [isNotAuthenticatedGuard],
    loadChildren: () => import('./auth/auth.routes'),
  },
  {
    path: 'dashboard',
    canActivate: [IsAuthenticatedGuard],
    loadChildren: () => import('./dashboard/dashboard.routes'),
  },
  { path: '**', redirectTo: 'auth' },
];

export default routes;