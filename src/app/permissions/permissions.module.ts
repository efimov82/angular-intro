import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CanPipe } from './pipes/can.pipe';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [ CanPipe ],
  exports: [ CanPipe ],
  providers: []
})
export class PermissionsModule { }
