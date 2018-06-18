import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Material
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { AppComponent } from './app.component';

import { CoursesModule } from './courses/courses.module';
import { SharedModule } from './shared/shared.module';
import { CoursesComponent } from './courses/pages/courses/courses.component';

const appRoutes: Routes = [
  // { path: 'courses/add', component: AddCourseComponent },

  { path: '**', component: CoursesComponent }
];

@NgModule({
  declarations: [
    AppComponent,

  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,

    // Routing
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
    // App feature modules
    CoursesModule,
    SharedModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
