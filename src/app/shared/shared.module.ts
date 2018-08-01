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

import { DurationPipe } from './pipes';
import {
  FreshCourseDirective,
  OnlyNumbersDirective,
} from './directives';

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
  ],
  entryComponents: [ConfirmDialogComponent]
})
export class SharedModule { }
