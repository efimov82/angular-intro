import { initialState } from './../appState';
import { ActionTypes } from '../actions/auth';
import * as authAction from '../actions/auth';

export function authReducer(state = initialState,
  action: authAction.Actions) {
    switch (action.type) {
      case ActionTypes.LOGIN_SUCCESS: {
        return {
          ...state,
          currentUser: action.payload,
          errorLoginMessage: ''
        };
      }
      case ActionTypes.LOGIN_FAILURE: {
        return {
          ...state,
          errorLoginMessage: 'Incorrect email and/or password.'
        };
      }
      case ActionTypes.LOGOUT: {
        return initialState;
      }

      default:
        return state;
    }
  }