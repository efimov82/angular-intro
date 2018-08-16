import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of as observableOf } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';

import * as coursesActions from '../actions/courses';
import { CoursesService } from '@app/shared/services';

@Injectable()
export class CoursesStoreEffects {
  constructor(private coursesService: CoursesService, private actions$: Actions) {}

  @Effect()
  loadMoreEffect$: Observable<Action> = this.actions$.pipe(
     ofType<coursesActions.LoadMoreAction>(
      coursesActions.ActionTypes.LOAD_MORE
    ),
    // startWith(new coursesActions.LoadRequestAction()),
    switchMap(action => {
      const data = action.payload;
      return this.coursesService.find(data.search, data.start, data.count)
        .pipe(
          map(response =>
            new coursesActions.LoadSuccessAction(
              { items: response.items, total: response.all }
            )
          ),
          catchError(error =>
            observableOf(new coursesActions.LoadFailureAction({ error }))
          )
        )
      }
     )
  );
}