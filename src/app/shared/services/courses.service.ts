import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';

import { coursesList } from '../mocks/courses';
import {
  Course,
  CoursesResponse,
} from '../interfaces';
import { CoursesServiceInterface } from './corses.service.interface';


@Injectable({
  providedIn: 'root'
})
export class CoursesService implements CoursesServiceInterface {
  courses: Course[];

  constructor() { // coursesList: Course[]
    this.courses = coursesList;
   }

  find(searchString: string, start: number, countItems: number = 20): Observable<CoursesResponse> {
    let items = [];
    if (searchString) {
      items = this.courses.filter(course => this.search(course, searchString));
    } else {
      items = this.courses;
    }

    const all = items.length;
    items = items.slice(start, start + countItems);
    const count = items.length;

    const resp = <CoursesResponse>{
      items,
      count,
      all
    };

    return of(resp);
  }

  findBySlug(slug: string): Observable<Course> {
    const index = this.courses.findIndex(course => {
      if (course.slug === slug) {
        return true;
      }
    });

    return of(this.courses[index]);
  }

  delete(course: Course) {
    this.courses = this.courses.filter(item => item !== course );
  }

  private search(course: Course, searchString: string) {
    return (
      course.title.indexOf(searchString) !== -1 ||
      course.description.indexOf(searchString) !== -1
    );
  }
}
