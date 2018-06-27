import { Observable } from 'rxjs';
import { CoursesResponse, Course } from '../interfaces';

export interface CoursesServiceInterface {
  find(searchString: string, start: number, countItems: number): Observable<CoursesResponse>;
  findBySlug(slug: string): Observable<Course>;
  delete(course: Course);
}
