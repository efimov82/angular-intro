import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatSnackBar, MatDialog } from '@angular/material';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

import { AddCourseComponent } from '@app/courses/components';
import { ConfirmDialogComponent } from '@shared/components/confirm-dialog/confirm-dialog.component';
import { Course } from '@shared/models/course.model';
// import { Course as CourseInterface } from '@shared/interfaces'
// import { CoursesService } from '@shared/services';
//import { AuthService } from '@app/auth/services';
// Store
import { AppState } from '@shared/store/appState';
import { LoadMoreAction } from '@shared/store/actions/courses';
import { getCoursesSelector } from './../../../shared/store/selectors/courses';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit, OnDestroy {
  coursesSub: Subscription; // Course[]
  courses: Course[] = [];
  countAll: number = 0;
  numStartItem: number = 0;
  countItems: number = 2;
  searchStr: string = '';

  constructor(
    // private coursesService: CoursesService,
    private store$: Store<AppState>,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
  ) {
    this.coursesSub = this.store$.select(getCoursesSelector)// 'courses' -> return ALL Store
      .subscribe(data => {
        console.log(data);
        const length = data.courses.length;
        if (!length) {
          return;
        }

        this.numStartItem += length;
        this.countAll = data.total;

        data.courses.map(course => {
          this.courses.push(course);
        });
      });
   }

  ngOnInit() {
    this.loadMore();
  }

  loadMore() {
    const payload = {
      start: this.numStartItem,
      count:this.countItems,
      search: this.searchStr
    };
    this.store$.dispatch(new LoadMoreAction(payload));

    // this.coursesService.find(this.searchStr, this.numStartItem, this.countItems).subscribe(
    //   resp => {
    //     if (resp.items.length == 0) {
    //       return;
    //     }

    //     this.numStartItem += resp.items.length;
    //     this.countAll = resp.all;

    //     resp.items.map(courseData => {
    //       const course = new Course(<CourseInterface>courseData);
    //       this.courses.push(course);
    //     });
    //   }
    // );
  }

  searchCourses(searchStr: string) {
    this.searchStr = searchStr;
    this.numStartItem = 0;
    this.courses = [];
    this.loadMore();
  }


  addCourse() {
    let course = new Course();
    let dialogRef = this.dialog.open(AddCourseComponent, {
      data: { course },
      disableClose: false,
    });

    dialogRef.componentInstance.onSave.subscribe(course => {
      try {
        // this.coursesService.add(course).subscribe(result => {
        //   if (result instanceof Course) {
        //     this.courses.push(result);

        //     dialogRef.close();
        //     this.snackBar.open('Course successfully added.', '', { duration: 4000 });
        //   } else {
        //     dialogRef.componentInstance.errors = result['errors'];
        //   }
        // });
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

    dialogRef.componentInstance.onSave.subscribe(data => {
      // this.coursesService.edit(data).subscribe(result => {
      //   if (result instanceof Course) {
      //     course.import(result);
      //     dialogRef.close();
      //     this.snackBar.open('Course successfully updated.', '', { duration: 4000 });
      //   } else {
      //     dialogRef.componentInstance.errors = result['errors'];
      //   }
      // });
    });
  }

  delete(course: Course) {
    let dialogRef = this.dialog.open(ConfirmDialogComponent, {
      disableClose: false
    });

    dialogRef.componentInstance.confirmMessage = 'Are you sure you want delete this course?';

    dialogRef.afterClosed().subscribe(result => {
      if (result == true) {
        // this.coursesService.delete(course).subscribe(
        //   res => {
        //     if (res) {
        //       this.countAll--;
        //       this.courses = this.courses.filter(item => item !== course);

        //       this.snackBar.open('Course deleted.', '', { duration: 4000 });
        //     } else {
        //       this.snackBar.open('Error course delete.', '', { duration: 4000 });
        //     }
        //   },
        //   error => {
        //     this.snackBar.open('Error course delete: ' + error.statusText, '', { duration: 4000 });
        //   }
        // );

      }
    });
  }

  ngOnDestroy() {
    this.coursesSub.unsubscribe();
  }
}
