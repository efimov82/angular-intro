import { Course } from '../interfaces/course';
import { Image } from '../interfaces/image';

export const coursesList: Course[] = [
  {
    id: 1,
    author: 'Sten Williams',
    title: 'Angular Starter course',
    dateCreation: new Date('2018-04-10 12:00:00'),
    duration: 124,
    description: 'Description of First Angular course.',
    thumbnail: <Image>{
      src: 'assets/images/courses/course-thumb-1.png',
      alt: 'Angular course'
    }
  },
  {
    id: 2,
    author: 'Alex Nishulin',
    title: 'Angular Forms course',
    dateCreation: new Date('2018-04-10 12:00:00'),
    duration: 124,
    description: 'Description for Angular Forms course.',
    thumbnail: <Image>{
      src: 'assets/images/courses/course-thumb-2.png',
      alt: 'Angular course'
    }
  },
  {
    id: 3,
    author: 'Piter Bayer',
    title: 'Angular Ninja course',
    dateCreation: new Date('2018-03-14 14:00:00'),
    duration: 250,
    description: 'Description of Second course.',
    thumbnail: <Image>{
      src: 'assets/images/courses/course-thumb-3.png',
      alt: 'Angular course'
    }
  },
  {
    id: 4,
    author: 'Jon Papa',
    title: 'Angular Guru NgRJS course',
    dateCreation: new Date('2017-12-09 14:00:00'),
    duration: 350,
    description: 'Description of Last course.',
    thumbnail: <Image>{
      src: 'assets/images/courses/course-thumb-4.png',
      alt: 'Angular course'
    }
  },
  {
    id: 5,
    author: 'Nina Fisher',
    title: 'Angular 6 course',
    dateCreation: new Date('2018-04-12 14:00:00'),
    duration: 650,
    description: 'Description of Angular6 course.',
    thumbnail: <Image>{
      src: 'assets/images/courses/course-thumb-1.png',
    }
  },
  {
    id: 6,
    author: 'Semen Slepakov',
    title: 'Angular NgRX Store, Actions, Reducers',
    dateCreation: new Date('2016-10-24 14:00:00'),
    duration: 350,
    description: `Description of Last course NgRX Store, Actions, Reducers.
      Use and don't use NgRX Store, Actions, Reducers.
    `,
    thumbnail: <Image>{
      src: 'assets/images/courses/course-thumb-2.png',
      alt: 'Angular course'
    }
  },
  {
    id: 7,
    author: 'Denis Davidov',
    title: 'Last course',
    dateCreation: new Date('2018-06-19 14:00:00'),
    duration: 350,
    description: 'Description of Last course.',
    thumbnail: <Image>{
      src: 'assets/images/courses/course-thumb-3.png',
    }
  }
];
