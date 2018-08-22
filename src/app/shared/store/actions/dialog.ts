import { Action } from '@ngrx/store';

export enum ActionTypes {
  OPEN_DIALOG   = '[Dialog] Open',
  CLOSE_DIALOG  = '[Dialog] Close',
}

export class OpenDialogAction implements Action {
  readonly type = ActionTypes.OPEN_DIALOG;
  constructor(public payload: {component: any, data: any}) {}
}

export class CloseDialogAction implements Action {
  readonly type = ActionTypes.CLOSE_DIALOG;
}

export type Actions =
  | OpenDialogAction
  | CloseDialogAction;