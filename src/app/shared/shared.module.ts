import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StorageServiceModule } from 'angular-webstorage-service';
import { NgxSpinnerModule } from 'ngx-spinner';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

// import { TagInputModule } from 'ngx-chips';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialsModule } from '../materials/materials.module';
import { PermissionsModule } from './../permissions/permissions.module';
//Effects
import { AuthEffects } from './store/effects/auth';
import { CoursesEffects } from './store/effects/courses';
import { SnackBarEffects } from './store/effects/snackBar';
import { DialogEffects } from "./store/effects/dialog";
// Reducers
import { authReducer } from '@app/shared/store/reducers/auth';
import { courseReducer } from '@app/shared/store/reducers/courses';

import { HttpErrorHandler } from './services/http-error-handler.service';

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
    BrowserAnimationsModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialsModule,
    RouterModule,
    StorageServiceModule,
    PermissionsModule,
    NgxSpinnerModule,
    // TagInputModule,
    StoreModule.forFeature('courses', courseReducer),
    StoreModule.forFeature('auth', authReducer),
    EffectsModule.forFeature([
      AuthEffects,
      CoursesEffects,
      DialogEffects,
      SnackBarEffects]),
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
    NgxSpinnerModule,
    // TagInputModule
  ],
  entryComponents: [
    ConfirmDialogComponent
  ],
  providers: [
    HttpErrorHandler
  ]
})
export class SharedModule { }
