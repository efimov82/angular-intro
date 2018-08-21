import { User } from '@app/shared/interfaces/user';
import { Course } from '@shared/models/course.model';

export interface AppState {
  courses: Course[]; // Map<string,
  currentUser: User;
  totalCourses: number;
  errorLoginMessage: string;
}

export const initialState: AppState = {
  courses: [],
  currentUser: null,
  totalCourses: 0,
  errorLoginMessage: '',
}