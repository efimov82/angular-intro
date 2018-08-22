import { Course } from '../models/course.model';

export interface CoursesResponse {
  items: Course[];
  count: number;
  all: number;
}
