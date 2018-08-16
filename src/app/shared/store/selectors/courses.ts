import { AppState } from './../appState';
import { Course } from './../../interfaces/course';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export interface CoursesState {
  courses: Course[];
  totalCourses: number;
}

// export const  = createFeatureSelector('courses');
// export const selectCourse = (state: AppState) => state.courses;

export const getCoursesSelector = createSelector(
  //getCoursesState
  //selectCourse,
  createFeatureSelector('courses'),
  (state: AppState) => {
    return { courses: state.courses, total: state.totalCourses }
  }
);