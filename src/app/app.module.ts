import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Material
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
  MatButtonModule,
  MatCheckboxModule,
  MatToolbarModule, MatSidenavModule, MatIconModule, MatListModule
} from '@angular/material';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { LogoComponent } from './components/logo/logo.component';
import { CoursesComponent } from './pages/courses/courses.component';
import { BreadcrumbsComponent } from './components/breadcrumbs/breadcrumbs.component';
import { CourseComponent } from './components/course/course.component';
import { LayoutModule } from '@angular/cdk/layout';
import { UserInfoComponent } from './components/user-info/user-info.component';
import { SearchCourseComponent } from './components/search-course/search-course.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LogoComponent,
    CoursesComponent,
    BreadcrumbsComponent,
    CourseComponent,
    UserInfoComponent,
    SearchCourseComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    FlexLayoutModule,
    // Materials
    MatButtonModule,
    MatCheckboxModule,
    MatToolbarModule,
    LayoutModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
