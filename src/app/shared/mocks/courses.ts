import { Course } from '../models/course.model';
import { Image } from '../interfaces/image';

export const coursesList: Course[] = [
  new Course({
    id: 1,
    slug: 'starter-course',
    author: 'Ninja Squad',
    title: 'Angular 6 - What\'s new?',
    dateCreation: new Date('2018-05-04 12:00:00'),
    duration: 124,
    description: 'What\'s new in Angular 6.0, by Ninja Squad.',
    thumbnail: <Image>{
      src: 'assets/images/courses/course-thumb-1.png',
      alt: 'Angular course'
    },
    youtubeId: 'NpnsqOCkhIs',
  }),
  new Course({
    id: 2,
    slug: 'forms-course',
    author: 'Alex Nishulin',
    title: 'Angular Forms course',
    dateCreation: new Date('2018-04-10 12:00:00'),
    duration: 124,
    description: 'Description for Angular Forms course.',
    thumbnail: <Image>{
      src: 'assets/images/courses/course-thumb-2.png',
      alt: 'Angular course'
    },
    youtubeId: 'oa9cnWTpqP8'
  }),
  new Course({
    id: 3,
    slug: 'ng-ninja',
    author: 'Piter Bayer',
    title: 'Angular Material And Angular 6 ',
    dateCreation: new Date('2018-03-14 14:00:00'),
    duration: 250,
    description: 'Material Design For Angular.',
    thumbnail: <Image>{
      src: 'assets/images/courses/course-thumb-3.png',
      alt: 'Angular course'
    },
    youtubeId: 'bGReOt6r4ww'
  }),
  new Course({
    id: 4,
    author: 'Jon Papa',
    slug: 'guru-ngrx-course',
    title: 'Angular Guru NgRJS course',
    dateCreation: new Date('2017-12-09 14:00:00'),
    duration: 350,
    description: 'Description of Last course.',
    thumbnail: <Image>{
      src: 'assets/images/courses/course-thumb-4.png',
      alt: 'Angular course'
    },
    youtubeId: 'oa9cnWTpqP8'
  }),
  new Course({
    id: 5,
    slug: 'angular-6-course',
    author: 'DesignCours',
    title: 'Ngrx Store Tutorial for Angular',
    dateCreation: new Date('2018-04-05 14:00:00'),
    duration: 650,
    description: 'Learn State Management for Angular.',
    thumbnail: <Image>{
      src: 'assets/images/courses/course-thumb-1.png',
    },
    youtubeId: '9P5DTlg9oLc'
  }),
  new Course({
    id: 6,
    author: 'Semen Slepakov',
    slug: 'ngrx-store-course',
    title: 'Angular NgRX Store, Actions, Reducers',
    dateCreation: new Date('2016-10-24 14:00:00'),
    duration: 350,
    description: `Description of Last course NgRX Store, Actions, Reducers.
      Use and don't use NgRX Store, Actions, Reducers.
    `,
    thumbnail: <Image>{
      src: 'assets/images/courses/course-thumb-2.png',
      alt: 'Angular course'
    },
    youtubeId: 'Tux1nhBPl_w'
  }),
  new Course({
    id: 7,
    author: 'Denis Davidov',
    slug: 'last-course',
    title: 'Last course',
    dateCreation: new Date('2018-06-19 14:00:00'),
    duration: 350,
    description: 'Description of Last course.',
    thumbnail: <Image>{
      src: 'assets/images/courses/course-thumb-3.png',
    },
    youtubeId: 'oa9cnWTpqP8'
  })
];
