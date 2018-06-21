import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Course } from '../../../shared/interfaces/course';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})
export class CourseComponent implements OnInit {
  @Input() course:  Course;
  @Output() delete: EventEmitter<Course> = new EventEmitter();

  ngOnInit() {
  }

  deleteCourse() {
    this.delete.emit(this.course);
  }

}
