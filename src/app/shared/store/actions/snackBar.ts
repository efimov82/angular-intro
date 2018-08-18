import { Action } from '@ngrx/store';

export enum ActionTypes {
  SHOW_SNACKBAR = '[SnackBar] Show'
}

export class SnackBarShowAction implements Action {
  readonly type = ActionTypes.SHOW_SNACKBAR;
  constructor(public payload: { message: string, duration: number } = null) {}
}

export type Actions = SnackBarShowAction;