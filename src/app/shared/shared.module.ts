import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { LogoComponent } from './components/logo/logo.component';
import { BreadcrumbsComponent } from './components/breadcrumbs/breadcrumbs.component';
import { UserInfoComponent } from './components/user-info/user-info.component';
import { MaterialsModule } from '../materials/materials.module';

const COMPONENTS = [
  HeaderComponent,
  FooterComponent,
  LogoComponent,
  BreadcrumbsComponent,
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
    HeaderComponent,
    FooterComponent,
    LogoComponent,
    BreadcrumbsComponent,
    UserInfoComponent,
  ],
})
export class SharedModule { }
