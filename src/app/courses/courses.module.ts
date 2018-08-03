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
  SearchCourseComponent,
];

const PAGES = [
  CoursesComponent,
  CourseDetailsComponent,
];

@NgModule({
  imports: [
    CommonModule,
    MaterialsModule,
    SharedModule,
    // Routing
    RouterModule.forChild(
      coursesRoutes,
      // { enableTracing: true } // <-- debugging purposes only
    ),
  ],
  declarations: [
    ...COMPONENTS,
    ...PAGES,
  ],
  exports: [
    ...COMPONENTS,
    ...PAGES,
  ],
  entryComponents: [ AddCourseComponent ],
})
export class CoursesModule { }
