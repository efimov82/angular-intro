import { Directive, ElementRef, Input } from '@angular/core';
import { Course } from '../models/course.model';

@Directive({
  selector: '[appFreshCourse]'
})
export class FreshCourseDirective {
  @Input('appFreshCourse') course: Course;

  constructor(private el: ElementRef) {
    let dateCreation = ''; // ERROR if: this.course.dateCreation.toDateString();
    let now = new Date();
    now.setDate(now.getDate() - 14);

    // If creationDate < currentDate && creationDate >= currentDate - 14days
    if (dateCreation < Date() && dateCreation >= now.toString()) {
      this.el.nativeElement.style.borderColor = '#b9ffb3';
    } else if (dateCreation > Date()) {
      this.el.nativeElement.style.borderColor = 'blue';
    }
   }

}
