import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { MaterialsModule } from '../materials/materials.module';
import { AngularFontAwesomeModule } from 'angular-font-awesome';

import {
  BreadcrumbsComponent,
  HeaderComponent,
  FooterComponent,
  LogoComponent,
  NotFoundComponent,
  UserInfoComponent,
 } from './components';

const COMPONENTS = [
  BreadcrumbsComponent,
  HeaderComponent,
  FooterComponent,
  LogoComponent,
  NotFoundComponent,
  UserInfoComponent,
];

@NgModule({
  imports: [
    CommonModule,
    MaterialsModule,
    AngularFontAwesomeModule,
    RouterModule,
  ],
  declarations: [
    ...COMPONENTS
  ],
  exports: [
    ...COMPONENTS,
    AngularFontAwesomeModule,
    MaterialsModule,
  ],
})
export class SharedModule { }
