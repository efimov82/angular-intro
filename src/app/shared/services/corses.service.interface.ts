import { Observable } from "rxjs";
import { CoursesResponse, Course } from "../interfaces";

export interface CoursesServiceInterface {
  find(searchString: string, start: number, countItems: number): Observable<CoursesResponse>;
  delete(course: Course);
}