import { AppState } from './../appState';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export const selectAuthError = createSelector(
  createFeatureSelector('auth'),
  (state: AppState) => {
    return state.errorLoginMessage
  }
)

export const selectCurrentUser = createSelector(
  createFeatureSelector('auth'),
  (state: AppState) => {
    return state.currentUser
  }
)