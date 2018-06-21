import { Injectable } from '@angular/core';
import { coursesList } from '../mocks/courses';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  constructor() { }

  find(start: number, countItems: number = 20) {
    return coursesList.slice(start, start + countItems);
  }

  delete(course) {
    coursesList.filter(item => item == course );
    // coursesList = coursesList2;
    console.log(coursesList);
  }
}
