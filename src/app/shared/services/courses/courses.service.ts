import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map, catchError }  from 'rxjs/operators';

import {
  CoursesResponse,
  Course as CourseInterface
} from '@shared/interfaces';
import { CoursesServiceInterface } from './corses.service.interface';
import { HttpClient } from '@angular/common/http';
import { Course } from '@shared/models/course.model';

import { environment } from '@environments/environment';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class CoursesService implements CoursesServiceInterface {
  endPoint = `${environment.restEndPoint}/courses`;
  courses: Course[];

  constructor(private http: HttpClient,
    private spinner: NgxSpinnerService
  ) {}

  find(searchString: string, start: number, countItems: number = 20): Observable<CoursesResponse> {
    let url = `${this.endPoint}?search=${searchString}&start=${start}&count=${countItems}`;

    this.spinner.show();
    return this.http.get(url).pipe(
      map(data => {
        data['items'].map(item => {
          item.thumbnail = environment.restEndPoint + item.thumbnail;
        });

        setTimeout(() => this.spinner.hide(), 1000);
        const courses = data['items'].map(item => new Course(item));
        return {
            items: courses,
            count: data['count'],
            all: data['all']
        };
      })
    );
  }

  findBySlug(slug: string): Observable<Course|null> {
    let url = `${this.endPoint}/${slug}`;

    this.spinner.show();
    return this.http.get(url).pipe(
      map(response => {
        console.log(response);
        setTimeout(() => this.spinner.hide(), 1000);

        if (response) {
          return new Course(<CourseInterface>response);
        } else {
          return null;
        }
      })
    );
  }

  add(course: Course): Observable<Course| any> {
    let payload = new FormData();
    payload.append('authors', course.authors);
    payload.append('duration', course.duration.toString());
    payload.append('title', course.title);
    payload.append('description', course.description);
    payload.append('youtubeId', course.youtubeId);

    if (course.thumbnailFile) {
      payload.append('thumbnail', course.thumbnailFile.files[0], course.thumbnailFile.files[0].name);
    }

    this.spinner.show();

    return this.http.post(this.endPoint, payload).pipe(
      map(response => {
        const courseNew = new Course(<CourseInterface>response);

        setTimeout(() => this.spinner.hide(), 1000);
        if (courseNew instanceof Course) {
          courseNew.setThunmnail(environment.restEndPoint + courseNew.thumbnail);
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
    let payload = new FormData();
    payload.append('authors', course.authors);
    payload.append('duration', course.duration.toString());
    payload.append('title', course.title);
    payload.append('description', course.description);
    payload.append('youtubeId', course.youtubeId);

    if (course.thumbnailFile) {
      payload.append('thumbnail', course.thumbnailFile.files[0], course.thumbnailFile.files[0].name);
    }

    this.spinner.show();

    return this.http.put(url, payload).pipe(
      map(response => {
        // check maybe need Try-Catch here
        setTimeout(() => this.spinner.hide(), 1000);

        let courseNew = new Course(<CourseInterface>response);
        if (courseNew instanceof Course) {
          courseNew.setThunmnail(environment.restEndPoint + courseNew.thumbnail + '?v=' + Math.random());
          return courseNew;
        } else {
          return { res: false, errors: response['message'] };
        }
      })
    );
  }

  delete(course: Course): Observable<boolean> {
    let url = `${this.endPoint}/${course.slug}`;

    this.spinner.show();
    return this.http.delete(url).pipe(
      map(response => {
        setTimeout(() => this.spinner.hide(), 1000);

        if (response['result'] == 'deleted') {
          return true;
        } else {
          return false;
        }
      }
    ));
  }
}
