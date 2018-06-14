import { Course } from '../models/course';

export const coursesList = [
  <Course>{
    Id: 1,
    Title: 'First course',
    DateCreation: new Date(),
    Duration: 124,
    Description: 'Description of First Angular course.',
  },
  <Course>{
    Id: 2,
    Title: 'Second course',
    DateCreation: new Date(),
    Duration: 250,
    Description: 'Description of Second course.',
  },
  <Course>{
    Id: 3,
    Title: 'Last course',
    DateCreation: new Date(),
    Duration: 350,
    Description: 'Description of Last course.',
  }
];
