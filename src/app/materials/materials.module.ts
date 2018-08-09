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
  MatMenuModule,
} from '@angular/material';

import { MaterialFileInputModule } from 'ngx-material-file-input';

import { LayoutModule } from '@angular/cdk/layout';

const MODULES = [
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
  MatMenuModule,
  LayoutModule,
  // Flex
  FlexLayoutModule,
  // Upload
  MaterialFileInputModule,
];

@NgModule({
  imports: [
    CommonModule,
    ...MODULES
  ],
  exports: [
    ...MODULES
  ],
  declarations: []
})
export class MaterialsModule { }
