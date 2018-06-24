import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CoursesService } from '../../../shared/services/courses.service';
import { Course } from '../../../shared/interfaces';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.scss']
})
export class CourseDetailsComponent implements OnInit {

  private course: Course;
  private slug: string;
  private sub: any;

  constructor(
    private route: ActivatedRoute,
    private coursesService: CoursesService,
    public sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.slug = params['slug'];
      this.coursesService.findBySlug(this.slug).subscribe(
        course => this.course = course
      );
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
