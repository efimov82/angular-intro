import { TestBed, inject } from '@angular/core/testing';

import { CoursesService } from './courses.service';
import { Course } from '../models/course.model';

describe('CoursesService', () => {
  let service;

  beforeEach(() => {
    service = new CoursesService(); // <- set MOCK Course[] here for tests?
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('find with empty string', () => {
    const count = 2;
    service.find('', 0, count).subscribe(res => {
      expect(res.count == count).toBeTruthy();
      let courses = res.items;
      courses.forEach(course => { course instanceof Course });
    });
  });

  it('find with dont exists string', () => {
    const count = 0;
    service.find('dont-exists-course-string', 0, count).subscribe(res => {
      expect(res.count == count).toBeTruthy();
    });
  });

  it('find with exists string', () => {
    const count = 2;
    service.find('A', 0, count).subscribe(res => {
      expect(res.count == count).toBeTruthy();
    });
  });

});
