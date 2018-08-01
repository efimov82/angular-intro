import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SharedModule } from '@app/shared/shared.module';

import {
  LoginComponent,
} from '@app/auth/pages';

import { authRoutes } from './auth.routes';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    // Routing
    RouterModule.forChild(
      authRoutes
    ),
  ],
  declarations: [
    LoginComponent,
  ]
})
export class AuthModule { }
