import { initialState } from './../appState';
import { ActionTypes } from './../actions/courses';
import * as coursesAction from '../actions/courses';

export function courseReducer(state = initialState,
  action: coursesAction.Actions) {
    switch (action.type) {
      case ActionTypes.LOAD_FIRST_SUCCESS: {
        const payload = action.payload.items;
        return {
          ...state,
          courses: payload,
          totalCourses: action.payload.total
        }
      }
      case ActionTypes.LOAD_MORE_SUCCESS: {
        const payload = action.payload.items;
        return {
          ...state,
          courses: [ ...state.courses, ...payload],
          totalCourses: action.payload.total
        }
      }
      case ActionTypes.DELETE_SUCCESS: {
        const deletedCourse = action.payload;
        return {
          ...state,
          courses: state.courses.filter(course => course.slug !== deletedCourse.slug),
          totalCourses: state.totalCourses--
        }
      }
      default:
        return state;
    }
}