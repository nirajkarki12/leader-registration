import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/modules/core/guards/auth.guard';
// Import Containers
import { DefaultLayoutComponent } from './containers';
import {AppRoutes} from './constants/app-routes';

import { P404Component } from 'src/app/modules/shared/components/error/404.component';
import { P500Component } from 'src/app/modules/shared/components/error/500.component';
// Components
import { LoginComponent } from './modules/login/login.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: AppRoutes.login,
    pathMatch: 'full',
    data: {
      title: 'Login'
    },
  },
  {
    path: '404',
    component: P404Component,
    data: {
      title: 'Page 404'
    }
  },
  {
    path: '500',
    component: P500Component,
    data: {
      title: 'Page 500'
    }
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login Page'
    }
  },
  {
    path: '',
    canActivate: [AuthGuard],
    component: DefaultLayoutComponent,
    data: {
      title: 'Admin Portal'
    },
    children: [
        {
          path: AppRoutes.dashboard,
          loadChildren: () => import('./modules/dashboard/dashboard.module').then(m => m.DashboardModule)
        },
        {
          path: AppRoutes.leader,
          loadChildren: () => import('./modules/leader/leader.module').then(m => m.LeaderModule)
        },
      ]
  },
  { path: '**', component: P404Component }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
