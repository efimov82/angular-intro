import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

import { CoursesService } from '@shared/services/courses/courses.service';
import { Course } from '@shared/interfaces';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.scss']
})
export class CourseDetailsComponent implements OnInit, OnDestroy {

  public course: Course;
  public slug: string;
  private routerSubsription$: any;

  constructor(
    private route: ActivatedRoute,
    private coursesService: CoursesService,
    public sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    this.routerSubsription$ = this.route.params.subscribe(params => {
      this.slug = params['slug'];
      this.coursesService.findBySlug(this.slug).subscribe(
        course => this.course = course
      );
    });
  }

  ngOnDestroy() {
    this.routerSubsription$.unsubscribe();
  }
}
