import { Component, OnInit } from '@angular/core';

import { Course } from '../../../shared/models/course';
import { CoursesService } from '../../../shared/services/courses.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {
  courses: Course[];
  numStartItem = 0;
  countItems = 2;

  constructor(private coursesService: CoursesService) { }

  ngOnInit() {
    this.courses = this.coursesService.find(this.numStartItem, this.countItems);
  }

  loadMore() {
    this.numStartItem += this.countItems;
    this.coursesService.find(this.numStartItem, this.countItems)
      .map(course => this.courses.push(course));
  }

}
