import { Routes } from '@angular/router';
import { CoursesComponent } from './pages/courses/courses.component';
import { AddCourseComponent } from './components/add-course/add-course.component';

export const coursesRoutes: Routes = [
  {
    path: 'courses',
    children: [
      { path: '', component: CoursesComponent, },
      { path: 'add', component: AddCourseComponent }
    ]
  },
];
