import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';

import {
  MatButtonModule,
  MatCheckboxModule,
  MatToolbarModule,
  MatSidenavModule,
  MatIconModule,
  MatInputModule,
  MatListModule
} from '@angular/material';
import { LayoutModule } from '@angular/cdk/layout';

const COMPONENTS = [
  // Materials
  MatButtonModule,
  MatCheckboxModule,
  MatToolbarModule,
  LayoutModule,
  MatSidenavModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
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
