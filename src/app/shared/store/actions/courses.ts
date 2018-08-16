import { Course } from '@shared/interfaces';
import { Action } from '@ngrx/store';


export enum ActionTypes {
  ADD          = '[Courses] Add Request',
  LOAD_MORE    = '[Courses] Load more',
  LOAD_REQUEST = '[Courses] Load Request',
  LOAD_FAILURE = '[Courses] Load Failure',
  LOAD_SUCCESS = '[Courses] Load Success'
}

export class LoadRequestAction implements Action {
  readonly type = ActionTypes.LOAD_REQUEST;
}

export class AddAction implements Action {
  readonly type = ActionTypes.ADD;
  constructor(public payload: { course: Course }) {}
}

export class LoadMoreAction implements Action {
  readonly type = ActionTypes.LOAD_MORE;
  constructor(public payload: { start: number, count: number, search: string }) {}
}

export class LoadSuccessAction implements Action {
  readonly type = ActionTypes.LOAD_SUCCESS;
  constructor(public payload: { items: Course[], total: number }) {}
}

export class LoadFailureAction implements Action {
  readonly type = ActionTypes.LOAD_FAILURE;
  constructor(public payload: { error: string }) {}
}

export type Actions = AddAction
  | LoadMoreAction
  | LoadRequestAction
  | LoadSuccessAction
  | LoadFailureAction;