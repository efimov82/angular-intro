import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { map }  from 'rxjs/operators';

import {
  CoursesResponse,
  Course as CourseInterface
} from '../interfaces';
import { CoursesServiceInterface } from './corses.service.interface';
import { HttpClient } from '@angular/common/http';
import { Course } from '../models/course.model';


@Injectable({
  providedIn: 'root'
})
export class CoursesService implements CoursesServiceInterface {
  endPoint = 'http://localhost:3000/courses';
  courses: Course[];

  constructor(private http: HttpClient) {}

  find(searchString: string, start: number, countItems: number = 20): Observable<CoursesResponse> {
    let url = `${this.endPoint}?search=${searchString}&start=${start}&count=${countItems}`;

    return this.http.get(url).pipe(
      map(data => {
        return {
            items: data['items'].map(item => <Course>item),
            count: data['count'],
            all: data['all']
          };
      })
    );
  }

  findBySlug(slug: string): Observable<Course|null> {
    let url = `${this.endPoint}/${slug}`;

    return this.http.get(url).pipe(
      map(response => {
        let data = <CourseInterface>response;
        if (data) {
          return new Course(data);
        } else {
          return null;
        }
      })
    );
  }

  delete(course: Course) {
    let url = `${this.endPoint}/${course.slug}`;

    return this.http.delete(url).pipe(
      map(response => {
        if (response) {
          return true;
        } else {
          return false;
        }
      })
    );
  }

  private search(course: Course, searchString: string) {
    return (
      course.title.indexOf(searchString) !== -1 ||
      course.description.indexOf(searchString) !== -1
    );
  }
}
