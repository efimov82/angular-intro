import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterialsModule } from '../materials/materials.module';
import { AngularFontAwesomeModule } from 'angular-font-awesome';

import {
  BreadcrumbsComponent,
  ConfirmDialogComponent,
  HeaderComponent,
  FooterComponent,
  LogoComponent,
  NotFoundComponent,
  UserInfoComponent,
 } from './components';

import { DurationPipe } from './pipes';
import { FreshCourseDirective } from './directives';

const COMPONENTS = [
  BreadcrumbsComponent,
  ConfirmDialogComponent,
  HeaderComponent,
  FooterComponent,
  LogoComponent,
  NotFoundComponent,
  UserInfoComponent,
];

const DIRECTIVES = [
  FreshCourseDirective,
];

const PIPES = [
  DurationPipe,
]

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialsModule,
    AngularFontAwesomeModule,
    RouterModule,
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
  ],
  entryComponents: [ConfirmDialogComponent]
})
export class SharedModule { }
