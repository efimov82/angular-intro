import { Injectable } from '@angular/core';
import { coursesList } from '../mocks/courses';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  constructor() { }

  find() {
    return coursesList;
  }
}
