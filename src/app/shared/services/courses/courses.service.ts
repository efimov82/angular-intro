import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map, catchError }  from 'rxjs/operators';

import {
  CoursesResponse,
  Course as CourseInterface
} from '@shared/interfaces';
import { CoursesServiceInterface } from './corses.service.interface';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Course } from '@shared/models/course.model';

import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CoursesService implements CoursesServiceInterface {
  endPoint = `${environment.restEndPoint}/courses`;
  courses: Course[];

  constructor(private http: HttpClient) {}

  find(searchString: string, start: number, countItems: number = 20): Observable<CoursesResponse> {
    let url = `${this.endPoint}?search=${searchString}&start=${start}&count=${countItems}`;

    return this.http.get(url).pipe(
      map(data => {
        return {
            items: data['items'].map(item => <CourseInterface>item),
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

  add(course: Course): any {
    return this.http.post(this.endPoint, course).pipe(
      map(response => {
        let courseNew = new Course(<CourseInterface>response);
        if (courseNew instanceof Course) {
          return courseNew;
        } else {
          return { res: false, errors: response['message'] };
        }
      }),
      catchError(e => {
        // console.log(e.error);
        return throwError(e.error);
      })
    );

  }

  edit(course: Course) {
    let url = `${this.endPoint}/${course.slug}`;

    return this.http.put(url, course).pipe(
      map(response => {
        // check maybe need Try-Catch here
        let courseNew = new Course(<CourseInterface>response);
        if (courseNew instanceof Course) {
          return courseNew;
        } else {
          return { res: false, errors: response['message'] };
        }
      })
    );
  }

  delete(course: Course): Observable<boolean> {
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
}
