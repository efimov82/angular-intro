import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Validators, FormBuilder } from '@angular/forms';
//import { MatSnackBar } from '@angular/material';
import { selectCurrentUser } from '@app/shared/store/selectors/auth';
import { AppState } from '@shared/store/appState';
import { ProfileService } from './../../services/profile.service';
import { User } from '@app/shared/interfaces';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent {
  form = this.fb.group({
    nickname: [null, Validators.required],
    roles: [null],
    email: [null, Validators.required],
    password: [null, Validators.required],
    newPassword: [''],
    newPasswordConfirm: [''],
    avatarFile: [null]
  });

  hidePassword: boolean = true;
  hideNewPassword: boolean = true;
  hideNewPasswordConfirm: boolean = true;
  submitted: boolean = false;
  currentUser: User = null;

  constructor(
    private fb: FormBuilder,
    private profileService: ProfileService,
    private store$: Store<AppState>,
    //private snackBar: MatSnackBar,
  )
  {
    this.store$.select(selectCurrentUser).subscribe(user => {
      this.currentUser = user;
      if (user) {
        this.form.patchValue(user);
      }
    });
   }

  onSubmit() {
    if (this.form.invalid) {
      return;
    }

    let payload = new FormData();
    const data = this.form.value;

    payload.append('nickname', data.nickname);
    payload.append('password', data.password);
    payload.append('email', data.email);

    if (data.newPassword) {
      if (data.newPassword === data.newPasswordConfirm) {
        payload.append('newPassword', data.newPassword);
      } else {
        this.form.controls['newPassword'].setErrors({'incorrect': true});
        return false;
      }
    }

    if (data.avatarFile) {
      payload.append('avatar', data.avatarFile.files[0], data.avatarFile.files[0].name);
    }

    this.submitted = true;
  //   this.profileService.updateProfile(payload)
  //     .subscribe(
  //       response => {
  //         this.authService.updateCurrentUser(<User>response);

  //         this.snackBar.open('Settings successfully updated.', '', { duration: 4000 });
  //         this.submitted = false;
  //       },
  //       error => {
  //         this.submitted = false;
  //       });
  }
}
