import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SharedModule } from '@app/shared/shared.module';

import {
  LoginComponent,
} from '@app/auth/pages';

import { authRoutes } from './auth.routes';
import { JwtModule } from '@auth0/angular-jwt';
import { AuthGuardService } from '@app/auth/guards/auth-guard.service';

export function tokenGetter() {
  return localStorage.getItem('local_auth_user');
}

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    // Routing
    RouterModule.forChild(
      authRoutes
    ),
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ['localhost:3000'],
        blacklistedRoutes: ['localhost:3000/auth/']
      }
    })
  ],
  declarations: [
    LoginComponent,
  ],
  providers: [
    AuthGuardService,
  ]
})
export class AuthModule { }
