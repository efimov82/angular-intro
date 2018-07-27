import { Component, OnInit, Input, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Course } from '@app/shared/models/course.model';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.scss']
})
export class AddCourseComponent {
  course: Course = null;

  constructor(public dialogRef: MatDialogRef<AddCourseComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.course = data.course;
   }

  save() {
    console.log('save course');
    this.dialogRef.close();
  }

  cancel() {
    this.dialogRef.close();
  }
}
