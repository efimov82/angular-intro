import { Routes } from '@angular/router';

import {
  CoursesComponent,
  CourseDetailsComponent
} from './pages';

export const coursesRoutes: Routes = [
  {
    path: 'courses',
    children: [
      { path: '', component: CoursesComponent, pathMatch: 'full' },
      // { path: 'add', component: AddCourseComponent },
      { path: ':slug', component: CourseDetailsComponent },
    ]
  },
];
