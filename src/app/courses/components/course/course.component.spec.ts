import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseComponent } from './course.component';
import { SearchCourseComponent } from '../search-course/search-course.component';
import { CoursesComponent, CourseDetailsComponent } from '../../pages';
import { AddCourseComponent } from '../add-course/add-course.component';
import { coursesRoutes } from '../../courses.routes';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../../shared/shared.module';
import { APP_BASE_HREF } from '@angular/common';
import { Course } from '../../../shared/models/course.model';

describe('CourseComponent', () => {
  let component: CourseComponent;
  let fixture: ComponentFixture<CourseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseComponent,
      SearchCourseComponent,
      CoursesComponent,
      AddCourseComponent,
      CourseDetailsComponent,
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
    fixture = TestBed.createComponent(CourseComponent);
    component = fixture.componentInstance;
    const course = new Course({
      id: 1,
      slug: 'test',
      author: 'author',
      dateCreation: new Date(),
      description: 'description',
      duration: 120,
      title: 'title',
      thumbnail: new Image(),
      youtubeId: 'id',
        }
      );

    component.course = course;

    fixture.detectChanges();
  });

  it('should create', () => {

    expect(component).toBeTruthy();
  });
});
