import { Component, OnInit, EventEmitter, Inject, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Course } from '@app/shared/models/course.model';
import { AuthService } from '@app/auth/services';
import { Validators, FormBuilder, NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.scss']
})
export class AddCourseComponent {
  course: Course = null;
  errors: String[];
  fileToUpload: File = null;

  formCourse = this.fb.group({
    title: [null, Validators.required],
    description: [null, Validators.required],
    dateCreation: [null, Validators.required],
    duration: [null, Validators.required],
    youtubeId: [null, Validators.required],
    authors: [null, Validators.required],
    thumbnailFile: [null]
  });

  @Output() onSave = new EventEmitter<Course>();

  constructor(
    public dialogRef: MatDialogRef<AddCourseComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
  ){
    this.course = data.course;
    this.course.thumbnailFile = null;
    this.formCourse.patchValue(this.course);
   }

  onSubmit() {
    let data = this.formCourse.value;
    if (this.formCourse.valid)
    {
      this.course.import(data);
      this.onSave.emit(this.course);
    } else {
      console.log(this.formCourse.errors);
    }
  }

  cancel() {
    this.dialogRef.close();
  }
}
