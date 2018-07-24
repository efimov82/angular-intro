import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Course } from '../../../shared/interfaces/course';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})
export class CourseComponent {
  @Input() course:  Course;
  @Output() delete: EventEmitter<Course> = new EventEmitter();

  deleteCourse() {
    this.delete.emit(this.course);
  }
}
