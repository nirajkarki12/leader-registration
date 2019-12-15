import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppRoutes } from 'src/app/constants/app-routes';
// Components
import { ListComponent } from './list/list.component';
import { RegistrationComponent } from './registration/registration.component';
import { EditComponent } from './edit/edit.component';
// Resolver
import { LeaderDataResolverService } from './services/resolver/leader-data-resolver.service';
import { UnpaidLeadersComponent } from './unpaid-leaders/unpaid-leaders.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Leader'
    },
    children: [
      {
        path: '',
        component: ListComponent,
        data: {
          title: 'List'
        }
      },
      {
        path: AppRoutes.create,
        component: RegistrationComponent,
        data: {
          title: 'Add new Leader'
        }
      },
      {
        path: AppRoutes.unpaidLeaders,
        component: UnpaidLeadersComponent,
        data: {
          title: 'Unpaid Leaders'
        }
      },
      {
        path: AppRoutes.edit,
        component: EditComponent,
        resolve: {
          'leader': LeaderDataResolverService,
        },
        data: {
          title: 'Edit Leader'
        }
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LeaderRoutingModule { }
