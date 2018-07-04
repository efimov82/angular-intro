import { TestBed, inject } from '@angular/core/testing';

import { CoursesService } from './courses.service';

describe('CoursesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CoursesService]
    });
  });

  it('should be created', inject([CoursesService], (service: CoursesService) => {
    expect(service).toBeTruthy();
  }));

  it('find with empty string', inject([CoursesService], (service: CoursesService) => {
    const count = 2;
    let courses = service.find('', 0, count).subscribe(res => {
      expect(res.count == count).toBeTruthy();
    });

  }));
});
