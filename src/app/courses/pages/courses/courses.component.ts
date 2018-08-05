import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatDialog } from '@angular/material';

import { CoursesService } from '@shared/services';
import { ConfirmDialogComponent } from '@shared/components/confirm-dialog/confirm-dialog.component';
import { Course } from '@shared/models/course.model';
import { Course as CourseInterface } from '@shared/interfaces'
import { AddCourseComponent } from '@app/courses/components';
import { AuthService } from '@app/auth/services';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {
  courses: Course[];
  countAll: number;
  numStartItem = 0;
  countItems = 6;
  searchStr = '';

  constructor(
    private authService: AuthService,
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

  canAddCourse(): Boolean {
    return this.authService.isAuthenticated();
  }

  canEditCourse(course: Course): Boolean {
    // TODO add check right to owner Course here

    return this.authService.isAuthenticated();
  }

  canDeleteCourse(course: Course): Boolean {
    // TODO add check right to owner Course here

    return this.authService.isAuthenticated();
  }

  addCourse() {
    let course = new Course();
    let dialogRef = this.dialog.open(AddCourseComponent, {
      data: { course },
      disableClose: false,
    });

    dialogRef.componentInstance.onSave.subscribe(course => {
      try {
        this.coursesService.add(course).subscribe(result => {
          if (result instanceof Course) {
            this.courses.push(result);

            dialogRef.close();
            this.snackBar.open('Course successfully added.', '', { duration: 4000 });
          } else {
            dialogRef.componentInstance.errors = result['errors'];
          }
        });
      } catch (error) {
        dialogRef.componentInstance.errors = error['massage'];
      }
    });
  }

  edit(course: Course) {
    let dialogRef = this.dialog.open(AddCourseComponent, {
      data: { course },
      disableClose: false
    });

    dialogRef.componentInstance.onSave.subscribe(course => {
      this.coursesService.edit(course).subscribe(result => {
        let courseNew = <CourseInterface>result;
        console.log(courseNew);
        if (courseNew instanceof Course) {
          course = result;
          dialogRef.close();
          this.snackBar.open('Course successfully updated.', '', { duration: 4000 });
        } else {
          dialogRef.componentInstance.errors = result['errors'];
        }
      });
    });
  }

  delete(course: Course) {
    let dialogRef = this.dialog.open(ConfirmDialogComponent, {
      disableClose: false
    });

    dialogRef.componentInstance.confirmMessage = 'Are you sure you want delete this course?';

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.coursesService.delete(course).subscribe(
          res => {
            if (res) {
              this.countAll--;
              this.courses = this.courses.filter(item => item !== course);

              this.snackBar.open('Course deleted.', '', { duration: 4000 });
            } else {
              this.snackBar.open('Error course delete.', '', { duration: 4000 });
            }
          },
          error => {
            this.snackBar.open('Error course delete: ' + error.statusText, '', { duration: 4000 });
          }
        );

      }
    });
  }
}
