import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { LeaderRoutingModule } from './leader-routing.module';
import { RegistrationComponent } from './registration/registration.component';
import { ListComponent } from './list/list.component';
import { EditComponent } from './edit/edit.component';
import { UnpaidLeadersComponent } from './unpaid-leaders/unpaid-leaders.component';

@NgModule({
  declarations: [RegistrationComponent, ListComponent, EditComponent, UnpaidLeadersComponent],
  imports: [
    SharedModule,
    LeaderRoutingModule
  ]
})
export class LeaderModule { }
