import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';

import {
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatDatepickerModule,
  MatDialogModule,
  MatGridListModule,
  MatToolbarModule,
  MatSidenavModule,
  MatSnackBarModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatNativeDateModule,

} from '@angular/material';

import { LayoutModule } from '@angular/cdk/layout';

const COMPONENTS = [
  // Materials
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatDatepickerModule,
  MatDialogModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatSidenavModule,
  MatSnackBarModule,
  MatListModule,
  MatNativeDateModule,
  MatToolbarModule,

  LayoutModule,
  // Flex
  FlexLayoutModule,
];

@NgModule({
  imports: [
    CommonModule,
    ...COMPONENTS
  ],
  exports: [
    ...COMPONENTS
  ],
  declarations: []
})
export class MaterialsModule { }
