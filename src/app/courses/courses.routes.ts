import { Routes } from '@angular/router';

import {
  CoursesComponent,
  CourseDetailsComponent
} from './pages';

import { AddCourseComponent } from './components/add-course/add-course.component';

export const coursesRoutes: Routes = [
  {
    path: 'courses',
    children: [
      { path: '', component: CoursesComponent },
      { path: ':slug', component: CourseDetailsComponent },
      { path: 'add', component: AddCourseComponent }
    ]
  },
];
