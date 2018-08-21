import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { AppState } from '@shared/store/appState';
import { selectAuthError } from '@shared/store/selectors/auth';
import { LogIn } from '@app/shared/store/actions/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  errorSub: Subscription;
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error: string = '';
  hidePassword = true;

  constructor(
    private formBuilder: FormBuilder,
    private store$: Store<AppState>,
  ) {
    this.errorSub = this.store$.select(selectAuthError)
      .subscribe(error => {
        this.error = error;
        this.loading = false;
      })
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    const email = this.loginForm.controls.username.value;
    const password = this.loginForm.controls.password.value;

    this.loading = true;
    this.store$.dispatch(new LogIn({email, password}));
  }
  //   this.authenticationService.login(
  //     this.loginForm.controls.username.value,
  //     this.loginForm.controls.password.value
  //   ).subscribe(
  //       res => {
  //         if (res) {
  //           this.router.navigate([this.authenticationService.redirectUrl]);
  //         } else {
  //           this.error = 'Incorrect username or password.';
  //           this.loading = false;
  //         }
  //       },
  //       error => {
  //         this.error = 'Incorrect username or password.';
  //         this.loading = false;
  //       }
  //     );
  // }

  ngOnDestroy() {
    this.errorSub.unsubscribe();
  }
}
