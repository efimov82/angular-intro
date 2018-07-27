import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { Course } from '../models/course.model';

@Directive({
  selector: '[appFreshCourse]'
})
export class FreshCourseDirective implements OnInit {
  @Input('appFreshCourse') course: Course;
  @Input('colorFresh') colorFreshCourse: String = '#b9ffb3';
  @Input('colorCommingSoon') colorCommingSoon: String = 'lime';

  constructor(private el: ElementRef) {}

   ngOnInit() {
    const dateCreation = new Date(this.course.dateCreation).getTime();
    let now = new Date();
    const nowTime = now.getTime();
    now.setDate(now.getDate() - 14);
    const freshTime = now.getTime();

    if (dateCreation > nowTime) {
      this.el.nativeElement.style.borderColor = this.colorCommingSoon;
    } else if (dateCreation >= freshTime) {
      this.el.nativeElement.style.borderColor = this.colorFreshCourse;
    }
  }
}
