import { Injectable } from '@angular/core';
import { coursesList } from '../mocks/courses';
import { Course } from '../interfaces/course';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  courses: Course[];

  constructor() {
    this.courses = coursesList;
   }

  find(start: number, countItems: number = 20) {
    return this.courses.slice(start, start + countItems);
  }

  delete(course) {
    this.courses = this.courses.filter(item => item !== course );
  }
}
