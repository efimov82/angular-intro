import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Course } from '../../../shared/interfaces/course';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss'],
  // changeDetection:  ChangeDetectionStrategy.OnPush, <- break update data after save on server
})
export class CourseComponent {
  @Input() course:  Course;
  @Input() canEdit: boolean;
  @Input() canDelete: boolean;

  @Output() edit: EventEmitter<Course> = new EventEmitter();
  @Output() delete: EventEmitter<Course> = new EventEmitter();

  editCourse() {
    this.edit.emit(this.course);
  }

  deleteCourse() {
    this.delete.emit(this.course);
  }
}
