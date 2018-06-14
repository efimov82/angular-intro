import { Component, OnInit } from '@angular/core';
import { CoursesService } from '../../services/courses.service';
import { Course } from '../../models/course';
import { CourseComponent } from '../../components/course/course.component';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {
  courses: Course[];

  constructor(private coursesService: CoursesService) { }

  ngOnInit() {
    this.courses = this.coursesService.find();
  }

}
