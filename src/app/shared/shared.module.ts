import { CanPipe } from './../permissions/pipes/can.pipe';
import { PermissionsModule } from './../permissions/permissions.module';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StorageServiceModule } from 'angular-webstorage-service';

import { MaterialsModule } from '../materials/materials.module';
import { AngularFontAwesomeModule } from 'angular-font-awesome';

import {
  BreadcrumbsComponent,
  ConfirmDialogComponent,
  HeaderComponent,
  FooterComponent,
  LogoComponent,
  NotFoundComponent,
 } from './components';

import {
  DurationPipe,
} from './pipes';

import {
  FreshCourseDirective,
  OnlyNumbersDirective,
} from './directives';
import { Ability } from '@app/permissions/classes';

const COMPONENTS = [
  BreadcrumbsComponent,
  ConfirmDialogComponent,
  HeaderComponent,
  FooterComponent,
  LogoComponent,
  NotFoundComponent,
];

const DIRECTIVES = [
  FreshCourseDirective,
  OnlyNumbersDirective,
];

const PIPES = [
  DurationPipe,
]

@NgModule({
  imports: [
    AngularFontAwesomeModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialsModule,
    RouterModule,
    StorageServiceModule,
    //AbilityModule,
    PermissionsModule
  ],
  declarations: [
    ...COMPONENTS,
    ...DIRECTIVES,
    ...PIPES,
  ],
  exports: [
    ...COMPONENTS,
    ...DIRECTIVES,
    ...PIPES,
    AngularFontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialsModule,
    StorageServiceModule,
    PermissionsModule
  ],
  entryComponents: [
    ConfirmDialogComponent
  ],
  providers: [
    //Ability,
    { provide: Ability, useValue: new Ability() }
  ]
})
export class SharedModule { }
