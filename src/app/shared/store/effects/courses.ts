import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of as observableOf } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import * as coursesActions from '../actions/courses';
import { CoursesService } from '@app/shared/services';
import { Course } from '@app/shared/models/course.model';
import { SnackBarShowAction } from './../actions/snackBar';

@Injectable()
export class CoursesEffects {
  constructor(private coursesService: CoursesService, private actions$: Actions) {}

  @Effect()
  loadFirstRequestEffect$: Observable<Action> = this.actions$.pipe(
     ofType<coursesActions.LoadFirstRequestAction>(
      coursesActions.ActionTypes.LOAD_FIRST_REQUEST
    ),
    switchMap(action => {
      const data = action.payload;
      return this.coursesService.find(data.search, 0, data.count)
        .pipe(
          map(response =>
            new coursesActions.LoadFirstSuccessAction(
              { items: response.items, total: response.all }
            )
          ),
          catchError(error =>
            observableOf(new coursesActions.LoadFailureAction({ error }))
          )
        )
      }
    )
  )

  @Effect()
  loadMoreEffect$: Observable<Action> = this.actions$.pipe(
     ofType<coursesActions.LoadMoreAction>(
      coursesActions.ActionTypes.LOAD_MORE
    ),
    switchMap(action => {
      const data = action.payload;
      return this.coursesService.find(data.search, data.start, data.count)
        .pipe(
          map(response =>
            new coursesActions.LoadMoreSuccessAction(
              { items: response.items, total: response.all }
            )
          ),
          catchError(error =>
            observableOf(new coursesActions.LoadFailureAction({ error }))
          )
        )
      }
    )
  )

  @Effect()
  addCourseEffect$: Observable<Action> = this.actions$.pipe(
    ofType<coursesActions.AddAction>(
      coursesActions.ActionTypes.ADD
    ),
    switchMap(action => {
      const course = action.payload;
      console.log('course='+course);
      return this.coursesService.add(course)
        .pipe(
          switchMap(response => {
            console.log(response);
            return [
              new coursesActions.AddSuccessAction(response),
              new SnackBarShowAction({message: 'Course successfully added.', duration: 4000})
            ]
          }),
          catchError(error =>
            observableOf(new coursesActions.AddFailureAction({ error }))
          )
        )
      }
    )
  )

  @Effect()
  editCourseEffect$: Observable<Action> = this.actions$.pipe(
    ofType<coursesActions.EditAction>(
      coursesActions.ActionTypes.EDIT
    ),
    switchMap(action => {
      const course = action.payload;
      return this.coursesService.edit(course)
        .pipe(
          switchMap(response => {
            if (response instanceof Course) {
              return [
                new coursesActions.EditSuccessAction(response),
                new SnackBarShowAction({message: 'Course successfully updated.', duration: 4000})
              ]
            } else {
              //  ??? return
              new coursesActions.EditFailureAction(response.res['errors'])
            }
        }),
          catchError(error =>
            observableOf(new coursesActions.EditFailureAction({ error }))
          )
        )
      }
    )
  )

  @Effect()
  deleteCourseEffect$: Observable<Action> = this.actions$.pipe(
    ofType<coursesActions.EditAction>(
      coursesActions.ActionTypes.DELETE_COURSE
    ),
    switchMap(action => {
      const course = action.payload;
      return this.coursesService.delete(course)
        .pipe(
          switchMap(response => {
            if (response) {
              return [
                new coursesActions.DeleteSuccessAction(course),
                new SnackBarShowAction({message: 'Course successfully deleted.', duration: 4000})
              ]
            } else {
              //  ??? return
              new coursesActions.DeleteFailureAction(response.res['errors'])
            }
        }),
          catchError(error =>
            observableOf(new coursesActions.EditFailureAction({ error }))
          )
        )
      }
    )
  )

}