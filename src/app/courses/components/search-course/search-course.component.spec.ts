import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchCourseComponent } from './search-course.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../../shared/shared.module';
import { coursesRoutes } from '../../courses.routes';
import { APP_BASE_HREF } from '@angular/common';
import { CoursesComponent, CourseDetailsComponent } from '../../pages';
import { AddCourseComponent } from '../add-course/add-course.component';
import { CourseComponent } from '../course/course.component';

describe('SearchCourseComponent', () => {
  let component: SearchCourseComponent;
  let fixture: ComponentFixture<SearchCourseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchCourseComponent,
      CoursesComponent,
      AddCourseComponent,
      CourseDetailsComponent,
      CourseComponent,
    ],
      imports: [
        RouterModule.forRoot(coursesRoutes),
        SharedModule,
      ],
      providers: [{provide: APP_BASE_HREF, useValue : '/' }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
