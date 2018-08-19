import { Component, OnInit, OnDestroy } from '@angular/core';
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
  DeleteAction,
  LoadFirstRequestAction,
  LoadMoreAction
 } from '@shared/store/actions/courses';

import {
  OpenDialogAction,
  CloseDialogAction
} from "@shared/store/actions/dialog";

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

  public addCourse() {
    this.store$.dispatch(new OpenDialogAction({
      component: AddCourseComponent,
      data: {
        course: new Course(),
        disableClose: false,
        callbackOnSave: (course) => this.onSaveCallback(course)
      }
    }));
  }

  public onSaveCallback(course: Course) {
    this.store$.dispatch(new AddAction(course));
    // Refresh data by reset search params + pagination
    this.searchCourses('');
    this.store$.dispatch(new CloseDialogAction());
  }

  public edit(course: Course) {
    this.store$.dispatch(new OpenDialogAction({
      component: AddCourseComponent,
      data: {
        course,
        disableClose: false,
        callbackOnSave: (course) => this.onUpdateCallback(course)
      }
    }));
  }

  public onUpdateCallback(course: Course) {
    this.store$.dispatch(new EditAction(course));
    this.store$.dispatch(new CloseDialogAction());
  }

  public delete(course: Course) {
    this.store$.dispatch(new OpenDialogAction({
      component: ConfirmDialogComponent,
      data: {
        confirmMessage: 'Are you sure you want delete this course?',
        object: course,
        callbackFunction: (result, course) => this.onDeleteCallback(result, course)
      }})
    );
  }

  onDeleteCallback(result: boolean, course: Course) {
    if (result == true) {
      this.store$.dispatch(new DeleteAction(course));
    }
    this.store$.dispatch(new CloseDialogAction());
  }

  ngOnDestroy() {
    this.coursesSub.unsubscribe();
  }
}
