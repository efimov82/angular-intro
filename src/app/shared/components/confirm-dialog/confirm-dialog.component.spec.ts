import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmDialogComponent } from './confirm-dialog.component';
import { MatDialogRef, MatDialogModule } from '@angular/material';
import { MaterialsModule } from '../../../materials/materials.module';
import { NO_ERRORS_SCHEMA } from '@angular/compiler/src/core';

// describe('ConfirmDialogComponent', () => {
//   let component: ConfirmDialogComponent;
//   let fixture: ComponentFixture<ConfirmDialogComponent>;

//   beforeEach(async(() => {
//     TestBed.configureTestingModule({
//       declarations: [
//         ConfirmDialogComponent,
//         MatDialogRef
//       ],
//       imports: [
//         MatDialogModule
//       ],
//       schemas: [ NO_ERRORS_SCHEMA ]
//     })
//     .compileComponents();
//   }));

//   beforeEach(() => {
//     fixture = TestBed.createComponent(ConfirmDialogComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });
