import { initialState } from './../appState';
import { Course } from '@shared/models/course.model';
import { ActionTypes } from './../actions/courses';
import * as coursesAction from '../actions/courses';


export function courseReducer(state = initialState,
  action: coursesAction.Actions) {
    switch (action.type) {
      // case ActionTypes.ADD_SUCCESS: {
      //   const newCourse = action.payload;
      //   console.log(newCourse);
      //   console.log(state.courses);

      //   return {
      //     ...state
      //   };
      // }
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
      default:
        return state;
    }
}