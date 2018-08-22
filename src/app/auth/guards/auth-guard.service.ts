
import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
//import { AuthService } from '../services/auth/auth.service';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { AppState } from '@shared/store/appState';
import { User } from '@shared/interfaces/user';
import { selectCurrentUser } from '@app/shared/store/selectors/auth';

@Injectable()
export class AuthGuardService implements CanActivate {
  subscription: Subscription;
  currentUser: User = null;

  constructor(private store$: Store<AppState>,
    public router: Router) {
    this.subscription = this.store$.select(selectCurrentUser)
      .subscribe( user => {
        this.currentUser = user;
      });
   }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (!this.currentUser) {
      //this.auth.redirectUrl = state.url;
      this.router.navigate(['/auth/login'], { queryParams: { returnUrl: state.url } });

      return false;
    }
    return true;
  }
}