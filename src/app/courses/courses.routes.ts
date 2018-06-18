import { Routes } from '@angular/router';
import { CoursesComponent } from './pages/courses/courses.component';
import { NotFoundComponent } from '../not-found/not-found.component';

export const coursesRoutes: Routes = [
  { path: 'courses', component: CoursesComponent },
  { path: '**', component: NotFoundComponent }
];
