import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursesComponent } from './courses.component';
import { CourseComponent, SearchCourseComponent, AddCourseComponent } from '../../components';
import { SharedModule } from '../../../shared/shared.module';
import { RouterModule } from '@angular/router';
import { coursesRoutes } from '../../courses.routes';
import { CourseDetailsComponent } from '../course-details/course-details.component';
import { APP_BASE_HREF } from '@angular/common';

describe('CoursesComponent', () => {
  let component: CoursesComponent;
  let fixture: ComponentFixture<CoursesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CoursesComponent,
        CourseComponent,
        CourseDetailsComponent,
        AddCourseComponent,
        SearchCourseComponent,
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
    fixture = TestBed.createComponent(CoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
