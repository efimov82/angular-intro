import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MaterialsModule } from '../materials/materials.module';
import { SharedModule } from '../shared/shared.module';
// Routing
import { coursesRoutes } from './courses.routes';

// Pages Components
import {
  CoursesComponent,
  CourseDetailsComponent
} from './pages';

// Components
import {
  AddCourseComponent,
  CourseComponent,
  SearchCourseComponent
} from './components';

const COMPONENTS = [
  AddCourseComponent,
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
    CourseDetailsComponent,
  ],
  exports: [
    ...COMPONENTS
  ]
})
export class CoursesModule { }
