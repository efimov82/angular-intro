import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoursesComponent } from './pages/courses/courses.component';
import { CourseComponent } from './components/course/course.component';
import { SearchCourseComponent } from './components/search-course/search-course.component';
import { Routes, RouterModule } from '@angular/router';
import { MaterialsModule } from '../materials/materials.module';
import { SharedModule } from '../shared/shared.module';
import { NotFoundComponent } from '../not-found/not-found.component';
import { coursesRoutes } from './courses.routes';


const COMPONENTS = [
  CourseComponent,
  CoursesComponent,
  SearchCourseComponent,
];

@NgModule({
  imports: [
    CommonModule,
    MaterialsModule,
    SharedModule,
    // Routing
    RouterModule.forRoot(
      coursesRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
  ],
  declarations: [
    ...COMPONENTS,
    NotFoundComponent
  ],
  exports: [
    ...COMPONENTS
  ]
})
export class CoursesModule { }
