import { Course } from '@shared/models/course.model';
import { Action } from '@ngrx/store';

export enum ActionTypes {
  ADD                 = '[Courses] Add Request',
  ADD_SUCCESS         = '[Courses] Add Success',
  ADD_FAILURE         = '[Courses] Add Failure',
  EDIT                = '[Courses] Edit Request',
  EDIT_SUCCESS        = '[Courses] Edit Success',
  EDIT_FAILURE        = '[Courses] Edit Failure',
  DELETE_COURSE       = '[Courses] Delete Request',
  DELETE_SUCCESS      = '[Courses] Delete Success',
  DELETE_FAILURE      = '[Courses] Delete Failure',
  LOAD_MORE           = '[Courses] Load more',
  LOAD_MORE_SUCCESS   = '[Courses] Load Success',
  LOAD_FIRST_REQUEST  = '[Courses] Load First Request',
  LOAD_FIRST_SUCCESS  = '[Courses] Load First Success',
  LOAD_FAILURE        = '[Courses] Load Failure',
}

export class LoadFirstRequestAction implements Action {
  readonly type = ActionTypes.LOAD_FIRST_REQUEST;
  constructor(public payload: { count: number, search: string }) {}
}

export class AddAction implements Action {
  readonly type = ActionTypes.ADD;
  constructor(public payload: Course) {}
}

export class AddSuccessAction implements Action {
  readonly type = ActionTypes.ADD_SUCCESS;
  constructor(public payload: Course) {}
}

export class AddFailureAction implements Action {
  readonly type = ActionTypes.ADD_FAILURE;
  constructor(public payload: { error: string }) {}
}

export class EditAction implements Action {
  readonly type = ActionTypes.EDIT;
  constructor(public payload: Course) {}
}

export class EditSuccessAction implements Action {
  readonly type = ActionTypes.EDIT_SUCCESS;
  constructor(public payload: Course) {}
}

export class EditFailureAction implements Action {
  readonly type = ActionTypes.EDIT_FAILURE;
  constructor(public payload: { error: string }) {}
}

export class DeleteAction implements Action {
  readonly type = ActionTypes.DELETE_COURSE;
  constructor(public payload: Course) {}
}

export class DeleteSuccessAction implements Action {
  readonly type = ActionTypes.DELETE_SUCCESS;
  constructor(public payload: Course) {}
}

export class DeleteFailureAction implements Action {
  readonly type = ActionTypes.DELETE_FAILURE;
  constructor(public payload: { error: string }) {}
}

export class LoadMoreAction implements Action {
  readonly type = ActionTypes.LOAD_MORE;
  constructor(public payload: { start: number, count: number, search: string }) {}
}

export class LoadMoreSuccessAction implements Action {
  readonly type = ActionTypes.LOAD_MORE_SUCCESS;
  constructor(public payload: { items: Course[], total: number }) {}
}

export class LoadFirstSuccessAction implements Action {
  readonly type = ActionTypes.LOAD_FIRST_SUCCESS;
  constructor(public payload: { items: Course[], total: number }) {}
}

export class LoadFailureAction implements Action {
  readonly type = ActionTypes.LOAD_FAILURE;
  constructor(public payload: { error: string }) {}
}

export type Actions =
  | AddAction
  | AddSuccessAction
  | AddFailureAction
  | EditAction
  | EditSuccessAction
  | EditFailureAction
  | DeleteAction
  | DeleteSuccessAction
  | DeleteFailureAction
  | LoadFirstRequestAction
  | LoadFirstSuccessAction
  | LoadMoreAction
  | LoadMoreSuccessAction
  | LoadFailureAction;