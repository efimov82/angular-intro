import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';


interface inputData {
  callbackFunction: (res, object) => {},
  confirmMessage: string,
  object: any
}

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent implements OnInit {
  confirmMessage: string;
  callbackFunction: any;
  object: any;

  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: inputData
  ) {
    this.callbackFunction = data.callbackFunction;
    this.confirmMessage = data.confirmMessage;
    this.object = data.object
   }

  ngOnInit() {
  }

  onClick(res: boolean) {
    this.callbackFunction(res, this.object);
  }
}
