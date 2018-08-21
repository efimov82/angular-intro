import { SESSION_STORAGE, StorageService } from 'angular-webstorage-service';
import { Router } from '@angular/router';

import { map, switchMap, catchError, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Inject, Injectable } from '@angular/core';

import { environment } from '@environments/environment';
import { defineAbilityFor } from '@app/shared/abilities/ability.fn';
import { Ability } from '@app/permissions/classes';

import { LogInSuccess, LogInFailure } from './../actions/auth';

import { AuthService } from '@app/auth/services';
import * as authActions from '../actions/auth';

@Injectable()
export class AuthEffects {
  constructor(private authService: AuthService,
    private router: Router,
    private abilityService: Ability,
    @Inject(SESSION_STORAGE) private storage: StorageService,
    private actions$: Actions) {}

  @Effect()
  LogIn: Observable<any> = this.actions$.pipe(
    ofType<authActions.LogIn>(authActions.ActionTypes.LOGIN),
    map(action => action.payload),
    switchMap(payload => {
      return this.authService.login(payload.email, payload.password).pipe(
        map((user) => {
          if (user) {
            return new LogInSuccess(user);
          } else {
            return new LogInFailure({ error: 'Login failed' });
          }
        }),
        catchError((error) => {
          console.log('authActions: catchError =' + error);
          return of(new LogInFailure({ error: error }));
        })
      )
    })
  )

  @Effect({ dispatch: false })
  LogInSuccess: Observable<any> = this.actions$.pipe(
    ofType<authActions.LogInSuccess>(authActions.ActionTypes.LOGIN_SUCCESS),
    map((action: LogInSuccess)  => action.payload),
    tap((user) => {
      this.storage.set(environment.storageKeyForUser, user);
      const ability = defineAbilityFor(user);
      this.abilityService.update(ability.rules);
      this.router.navigate([this.authService.redirectUrl]);
    })
  );

  //TODO: check of nessesary
  // @Effect({ dispatch: false })
  // LogInFailure: Observable<any> = this.actions$.pipe(
  //   ofType(authActions.ActionTypes.LOGIN_FAILURE)
  // );

  @Effect({ dispatch: false })
  LogOut: Observable<any> = this.actions$.pipe(
    ofType(authActions.ActionTypes.LOGOUT),
    tap(() => {
      this.storage.remove(environment.storageKeyForUser);
      this.abilityService.update([]);
      this.router.navigate(['/']);
    })
  );
}