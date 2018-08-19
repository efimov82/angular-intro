import { HttpErrorHandler } from './services/http-error-handler.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StorageServiceModule } from 'angular-webstorage-service';
import { NgxSpinnerModule } from 'ngx-spinner';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { MaterialsModule } from '../materials/materials.module';
import { PermissionsModule } from './../permissions/permissions.module';
//store
import { CoursesEffects } from './store/effects/courses';
import { SnackBarEffects } from './store/effects/snackBar';

import { courseReducer } from '@app/shared/store/reducers/courses';

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
    PermissionsModule,
    NgxSpinnerModule,
    StoreModule.forFeature('courses', courseReducer),
    // StoreModule.forFeature('snackBar', snackBarReducer),
    EffectsModule.forFeature([ CoursesEffects, SnackBarEffects ]),
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
    PermissionsModule,
    NgxSpinnerModule
  ],
  entryComponents: [
    ConfirmDialogComponent
  ],
  providers: [
    HttpErrorHandler
  ]
})
export class SharedModule { }
