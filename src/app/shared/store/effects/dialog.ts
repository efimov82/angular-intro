import { switchMap, tap } from 'rxjs/operators';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';

import * as dialogActions from '../actions/dialog';

@Injectable()
export class DialogEffects {
  constructor(private dialog: MatDialog, private actions$: Actions) {}

  @Effect({dispatch: false})
  openDialogEffect$: Observable<Action> = this.actions$.pipe(
     ofType<dialogActions.OpenDialogAction>(
      dialogActions.ActionTypes.OPEN_DIALOG
    ),
    tap((action: dialogActions.OpenDialogAction) => {
      const payload = action.payload;
      console.log(payload);

      this.dialog.open(payload.component, {data: payload.data});
    })
  )

  @Effect({dispatch: false})
  closeDialogEffect$: Observable<Action> = this.actions$.pipe(
     ofType<dialogActions.CloseDialogAction>(
      dialogActions.ActionTypes.CLOSE_DIALOG
    ),
    tap((action: dialogActions.CloseDialogAction) => {
      this.dialog.closeAll();
    })
  )

}