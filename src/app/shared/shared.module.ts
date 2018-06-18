import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialsModule } from '../materials/materials.module';

import { 
  BreadcrumbsComponent,
  HeaderComponent,
  FooterComponent,
  LogoComponent,
  NotFoundComponent,
  UserInfoComponent,
 } from './components';

const COMPONENTS = [
  HeaderComponent,
  FooterComponent,
  LogoComponent,
  BreadcrumbsComponent,
  NotFoundComponent,
  UserInfoComponent,
];

@NgModule({
  imports: [
    CommonModule,
    MaterialsModule,
  ],
  declarations: [
    ...COMPONENTS
  ],
  exports: [
    ...COMPONENTS
  ],
})
export class SharedModule { }
