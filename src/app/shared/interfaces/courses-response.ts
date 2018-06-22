import { Course } from './course';

export interface CoursesResponse {
  items: Course[];
  count: number;
  all: number;
}
