import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { userResolver } from './resolvers/user.resolver';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./pages/dashboard/dashboard.component').then((m) => m.DashboardComponent),
    canActivate: [authGuard],
    resolve: { user: userResolver },
    children: [
      {
        path: 'all-posts',
        loadComponent: () =>
          import('./pages/dashboard/all-posts/all-posts.component').then(m => m.AllPostsComponent),
      },
      {
        path: 'my-posts',
        loadComponent: () =>
          import('./pages/dashboard/my-posts/my-posts.component').then(m => m.MyPostsComponent),
      }
    ]
  }
];

