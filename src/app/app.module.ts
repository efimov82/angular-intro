import { EffectsModule } from '@ngrx/effects';

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// Modules
import { AuthModule } from '@app/auth/auth.module';
import { CoursesModule } from './courses/courses.module';
import { SharedModule } from '@shared/shared.module';

import { AppComponent } from './app.component';
import { NotFoundComponent } from '@shared/components';

import { JwtInterceptor } from '@app/auth/helpers/jwt.injector';
import { NGX_MAT_FILE_INPUT_CONFIG } from 'ngx-material-file-input';
import { FileInputConfig } from 'ngx-material-file-input/lib/model/file-input-config.model';
import { ProfileModule } from '@app/profile/profile.module';


import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';

export const config: FileInputConfig = {
  sizeUnit: 'Octet'
};

const appRoutes: Routes = [
  { path: '', redirectTo: '/courses', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),

    // Routing
    RouterModule.forRoot(
      appRoutes,
      // { enableTracing: true } // <-- debugging purposes only
    ),
    // App feature modules
    AuthModule,
    CoursesModule,
    SharedModule,
    ProfileModule,

    !environment.production ? StoreDevtoolsModule.instrument({
      maxAge: 20
    }) : [],
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: NGX_MAT_FILE_INPUT_CONFIG, useValue: config },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
