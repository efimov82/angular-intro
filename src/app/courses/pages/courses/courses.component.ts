import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

import { AddCourseComponent } from '@app/courses/components';
import { ConfirmDialogComponent } from '@shared/components/confirm-dialog/confirm-dialog.component';
import { Course } from '@shared/models/course.model';
// Store
import { AppState } from '@shared/store/appState';
import {
  AddAction,
  EditAction,
  LoadFirstRequestAction,
  LoadMoreAction
 } from '@shared/store/actions/courses';
import { getCoursesSelector } from '@shared/store/selectors/courses';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit, OnDestroy {
  coursesSub: Subscription;
  courses: Course[] = [];
  countAll: number = 0;
  numStartItem: number = 0;
  countItems: number = 2;
  searchStr: string = '';

  constructor(
    private store$: Store<AppState>,
    private dialog: MatDialog,
  ) {
    this.coursesSub = this.store$.select(getCoursesSelector)// 'courses' -> return ALL Store
      .subscribe(data => {
        this.numStartItem += data.courses.length;
        this.countAll = data.total;
        this.courses = data.courses;
      });
   }

  ngOnInit() {
    const payload = {
      count:this.countItems,
      search: this.searchStr
    };

    this.store$.dispatch(new LoadFirstRequestAction(payload));
  }

  loadMore() {
    const payload = {
      start: this.numStartItem,
      count:this.countItems,
      search: this.searchStr
    };

    this.store$.dispatch(new LoadMoreAction(payload));
  }

  searchCourses(searchStr: string) {
    this.searchStr = searchStr;
    this.numStartItem = 0;
    this.courses = [];
    this.ngOnInit();
  }

  addCourse() {
    let course = new Course();
    let dialogRef = this.dialog.open(AddCourseComponent, {
      data: { course },
      disableClose: false,
    });

    dialogRef.componentInstance.onSave.subscribe(course => {
      this.store$.dispatch(new AddAction(course));
      dialogRef.close();
      // Refresh data by reset search params + pagination
      this.searchCourses('');

        //try {
        // this.coursesService.add(course).subscribe(result => {
        //   if (result instanceof Course) {
        //     this.courses.push(result);

        //     dialogRef.close();
        //     this.snackBar.open('Course successfully added.', '', { duration: 4000 });
        //   } else {
        //     dialogRef.componentInstance.errors = result['errors'];
        //   }
        // });
      // } catch (error) {
      //   dialogRef.componentInstance.errors = error['massage'];
      // }
    });
  }

  edit(course: Course) {
    let dialogRef = this.dialog.open(AddCourseComponent, {
      data: { course },
      disableClose: false
    });

    dialogRef.componentInstance.onSave.subscribe(courseForUpdate => {
      this.store$.dispatch(new EditAction({course: courseForUpdate}));
      dialogRef.close();
      
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
