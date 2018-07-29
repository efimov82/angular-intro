import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SharedModule } from '@app/shared/shared.module';

import {
  LoginComponent,
  LogoutComponent
} from '@app/auth/pages';

import { authRoutes } from './auth.routes';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    // Routing
    RouterModule.forRoot(
      authRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
  ],
  declarations: [
    LoginComponent,
    LogoutComponent
  ]
})
export class AuthModule { }
