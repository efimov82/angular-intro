import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseDetailsComponent } from './course-details.component';
import { RouterModule } from '@angular/router';
import { coursesRoutes } from '../../courses.routes';
import { SharedModule } from '../../../shared/shared.module';
import { CoursesComponent } from '../courses/courses.component';
import { AddCourseComponent, SearchCourseComponent, CourseComponent } from '../../components';
import { APP_BASE_HREF } from '@angular/common';
import { AngularFontAwesomeModule } from 'angular-font-awesome';

describe('CourseDetailsComponent', () => {
  let component: CourseDetailsComponent;
  let fixture: ComponentFixture<CourseDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CourseDetailsComponent,
        CoursesComponent,
        AddCourseComponent,
        SearchCourseComponent,
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
    fixture = TestBed.createComponent(CourseDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
