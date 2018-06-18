import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { LogoComponent } from './components/logo/logo.component';
import { BreadcrumbsComponent } from './components/breadcrumbs/breadcrumbs.component';
import { UserInfoComponent } from './components/user-info/user-info.component';
import { MaterialsModule } from '../materials/materials.module';
import { NotFoundComponent } from './components';

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
