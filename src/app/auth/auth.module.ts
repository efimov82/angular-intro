import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { JwtModule } from '@auth0/angular-jwt';

import { SharedModule } from '@app/shared/shared.module';
import {
  LoginComponent,
} from '@app/auth/pages';

import { authRoutes } from './auth.routes';
import { AuthGuardService } from '@app/auth/guards/auth-guard.service';

import { environment as env } from '@environments/environment';

export function authTokenGetter() {
  return localStorage.getItem(env.storageKeyForUser);
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
        tokenGetter: authTokenGetter,
        // TODO check set this values
        //whitelistedDomains: env.JwtWhitelistedDomains,
        //blacklistedRoutes: env.JwtBlacklistedRoutes
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
