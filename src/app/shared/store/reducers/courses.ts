import { initialState } from './../appState';
import { Course } from '@shared/models/course.model';
import { ActionTypes } from './../actions/courses';
import * as coursesAction from '../actions/courses';


export function courseReducer(state = initialState,
  action: coursesAction.Actions) {
    switch (action.type) {
      case ActionTypes.ADD: {
        const newCourse = action.payload;
        return {
          ...state,
          courses: [ ...state.courses, newCourse ]
        };
      }
      case ActionTypes.LOAD_SUCCESS: {
        const payload = action.payload.items;
        return {
          ...state,
          courses: payload.map(item => new Course(item)),
          totalCourses: action.payload.total
        }
      }
      default:
        return state;
    }
}