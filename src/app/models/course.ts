import { CourseInterface } from '../interfaces/course';

export class Course implements CourseInterface {
  Id: number;
  Title: string;
  DateCreation: Date; 
  Duration: number;
  Description: string;
}
