import { Component, OnInit, EventEmitter, Inject, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Course } from '@app/shared/models/course.model';
import { AuthService } from '@app/auth/services';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.scss']
})
export class AddCourseComponent {
  course: Course = null;
  errors: String[];

  @Output() onSave = new EventEmitter<Course>();

  constructor(
    public dialogRef: MatDialogRef<AddCourseComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private authService: AuthService
  ){
    this.course = data.course;
   }

  saveClick() {
    this.onSave.emit(this.course);
  }

  cancel() {
    this.dialogRef.close();
  }
}
