import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { coursesRoutes } from './courses/courses.routes';
import { SharedModule } from './shared/shared.module';
import { APP_BASE_HREF } from '@angular/common';
import { CoursesComponent, CourseDetailsComponent } from './courses/pages';
import { AddCourseComponent, CourseComponent, SearchCourseComponent } from './courses/components';
describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        AddCourseComponent,
        CoursesComponent,
        CourseComponent,
        SearchCourseComponent,
        CourseDetailsComponent,
      ],
      imports: [
        RouterModule.forRoot(coursesRoutes),
        SharedModule,
      ],
      providers: [{provide: APP_BASE_HREF, useValue : '/' }]
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
