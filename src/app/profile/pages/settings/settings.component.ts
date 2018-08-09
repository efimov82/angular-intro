import { MatSnackBar } from '@angular/material';
import { AuthService } from '@app/auth/services';
import { Validators, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent {
  form = this.fb.group({
    nickname: [null, Validators.required],
    email: [null, Validators.required],
    password: [null, Validators.required],
    newPassword: [null],
    newPasswordConfirm: [null],
    avatarFile: [null]
  });
  hidePassword: boolean = true;
  hideNewPassword: boolean = true;
  hideNewPasswordConfirm: boolean = true;
  submitted: boolean = false;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar, )
  {
    this.authService.getAuthUser().subscribe(user => {
      this.form.patchValue(user);
    });
   }

   onSubmit() {
    if (this.form.invalid) {
      return;
    }

    this.submitted = true;
    this.snackBar.open('Suttings successfully saved.', '', { duration: 4000 });
   }
}
