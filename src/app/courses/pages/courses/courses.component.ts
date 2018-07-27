import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatDialogRef, MatDialog } from '@angular/material';

import { CoursesService } from '@shared/services';
import { ConfirmDialogComponent } from '@shared/components/confirm-dialog/confirm-dialog.component';
import { Course } from '@shared/models/course.model';
import { Course as CourseInterface } from '@shared/interfaces'
import { AddCourseComponent } from '@app/courses/components';


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
  searchStr = '';
  dialogRef: MatDialogRef<ConfirmDialogComponent>;
  dialogAddCourse: MatDialogRef<AddCourseComponent>;

  constructor(
    private coursesService: CoursesService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit() {
    this.courses = [];
    this.loadMore();
  }

  loadMore() {
    this.coursesService.find(this.searchStr, this.numStartItem, this.countItems).subscribe(
      resp => {
        this.countAll = resp.all;
        resp.items.map(courseData => {
          let course = new Course(<CourseInterface>courseData);
          this.courses.push(course);
        });
      }
    );

    this.numStartItem += this.countItems;
  }

  searchCourses(searchStr: string) {
    this.searchStr = searchStr;
    this.numStartItem = 0;
    this.courses = [];
    this.loadMore();
  }

  addCourse() {
    let course = new Course();
    this.dialogAddCourse = this.dialog.open(AddCourseComponent, {
      data: { course },
      disableClose: false,
    });
  }

  edit(course: Course) {
    this.dialogAddCourse = this.dialog.open(AddCourseComponent, {
      data: {course},
      disableClose: false
    });
  }

  delete(course: Course) {
    this.dialogRef = this.dialog.open(ConfirmDialogComponent, {
      disableClose: false
    });
    this.dialogRef.componentInstance.confirmMessage = 'Are you sure you want to delete course?';

    this.dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.coursesService.delete(course).subscribe(
          res => {
            if (res) {
              this.countAll--;
              this.courses = this.courses.filter(item => item !== course);

              this.snackBar.open('Course deleted.', '', {duration: 4000});
            } else {
              this.snackBar.open('Error course delete.', '', {duration: 4000});
            }
          },
          error => {
            this.snackBar.open('Error course delete: ' + error.statusText, '', {duration: 4000});
          }
        );

      }
      this.dialogRef = null;
    });
  }
}
