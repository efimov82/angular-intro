import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';

import { coursesList } from '../mocks/courses';
import {
  Course,
  CoursesResponse,
} from '../interfaces';


@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  courses: Course[];
  all: number;

  constructor() {
    this.courses = coursesList;
    this.all = coursesList.length;
   }

  find(start: number, countItems: number = 20): Observable<CoursesResponse> {
    const items = this.courses.slice(start, start + countItems);
    const resp = <CoursesResponse>{
      items: items,
      count: items.length,
      all: this.all
    };

    return of(resp);
  }

  delete(course) {
    this.courses = this.courses.filter(item => item !== course );
    this.all = this.courses.length;
  }
}
