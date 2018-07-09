import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmDialogComponent } from './confirm-dialog.component';
import { MatDialogRef, MatDialogModule } from '@angular/material';

describe('ConfirmDialogComponent', () => {
  let component: ConfirmDialogComponent;
  let fixture: ComponentFixture<ConfirmDialogComponent>;
  let mockDialogRef;

  beforeEach(async(() => {
    mockDialogRef = {
      close: jasmine.createSpy('close')
    };
    TestBed.configureTestingModule({
      declarations: [
        ConfirmDialogComponent,
      ],
      providers: [
        { provide: MatDialogRef, useValue: mockDialogRef }
      ],
      imports: [
        MatDialogModule
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  // it('Close button click', () => {
    // find how to ckick Close here
  //   expect(mockDialogRef.close).toHaveBeenCalledWith(true);
  // });
});
