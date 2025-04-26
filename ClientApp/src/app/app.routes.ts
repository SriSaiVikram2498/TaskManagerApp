import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./components/home/home.component').then(m => m.HomeComponent),
  },
  {
    path: 'list',
    loadComponent: () =>
      import('./components/list/list.component').then(m => m.ListComponent),
  },
  {
    path: 'forgot-password',
    loadComponent: () =>
      import('./components/forgot-password/forgot-password.component').then(m => m.ForgotPasswordComponent),
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./components/register/register.component').then(m => m.RegisterComponent),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
