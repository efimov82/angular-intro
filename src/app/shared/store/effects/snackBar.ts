import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Actions, Effect, ofType } from '@ngrx/effects';

import { MatSnackBar } from '@angular/material';
import  * as snackBarActions from  '../actions/snackBar';

@Injectable()
export class SnackBarEffects {
  constructor(private snackBar: MatSnackBar, private actions$: Actions) {}

  @Effect({dispatch: false})
  snackBarShowEffect$: Observable<Action> = this.actions$.pipe(
     ofType<snackBarActions.SnackBarShowAction>(
      snackBarActions.ActionTypes.SHOW_SNACKBAR
    ),
    tap((action: snackBarActions.SnackBarShowAction) => {
      const data = action.payload;
      this.snackBar.open(data.message, '', { duration: data.duration });
    })
  )
}