import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.scss']
})
export class AddCourseComponent {

  constructor(public dialogRef: MatDialogRef<AddCourseComponent>) { }

  save() {

  }

  cancel() {

    this.dialogRef.close();
  }
}
