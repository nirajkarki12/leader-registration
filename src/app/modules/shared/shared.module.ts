import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DatePipe } from '@angular/common';
// https://www.npmjs.com/package/ngx-custom-validators
import { CustomFormsModule } from 'ngx-custom-validators';
// https://www.npmjs.com/package/angular2-multiselect-dropdown
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';
// Pagination Component
import {
  PaginationModule,
  CollapseModule
} from 'ngx-bootstrap';
// https://www.npmjs.com/package/ngx-debounce
import { DebounceModule } from 'ngx-debounce';

import { NoRecordsFoundComponent } from './components/no-records-found/no-records-found.component';
import { LoadingComponent } from './components/loading/loading.component';
// Services
import { ValidatorMessageService } from './services/validator-message/validator-message.service';

@NgModule({
  imports: [
    CommonModule,
    AngularMultiSelectModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    PaginationModule.forRoot(),
    CollapseModule.forRoot(),
    DebounceModule,
    CustomFormsModule,
  ],
  declarations: [
    NoRecordsFoundComponent,
    LoadingComponent
  ],
  exports: [
    CommonModule,
    AngularMultiSelectModule,
    FormsModule,
    ReactiveFormsModule,
    PaginationModule,
    CollapseModule,
    DebounceModule,
    CustomFormsModule,
    RouterModule,
    NoRecordsFoundComponent,
    LoadingComponent,
  ],
  providers: [
    DatePipe,
    ValidatorMessageService
  ]
})
export class SharedModule { }
