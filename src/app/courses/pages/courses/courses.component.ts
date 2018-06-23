import { Component, OnInit } from '@angular/core';

import { Course } from '../../../shared/interfaces/course';
import { CoursesService } from '../../../shared/services/courses.service';

import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {
  courses: Course[];
  countAll: number;
  numStartItem = 0;
  countItems = 2;

  constructor(private coursesService: CoursesService,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.courses = [];
    this.loadMore();
  }

  loadMore() {
    this.coursesService.find(this.numStartItem, this.countItems).subscribe(
      resp => {
        this.countAll = resp.all;
        resp.items.map(course => this.courses.push(course));
      }
    );
    this.numStartItem += this.countItems;
  }

  delete(course: Course) {
    // TODO: Subscribe + get Count from Service answer
    this.coursesService.delete(course);
    this.countAll--;
    this.courses = this.courses.filter(item => item !== course);
    this.snackBar.open("This is the SnackBar Message", "Delete it!");
  }

}
