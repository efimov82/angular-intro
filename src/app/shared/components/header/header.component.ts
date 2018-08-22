import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { selectCurrentUser } from './../../store/selectors/auth';
import { AppState } from './../../store/appState';
import { User } from '@app/shared/interfaces';
import { Router } from '@angular/router';
import { LogOut } from '@app/shared/store/actions/auth';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  currentUser: User;
  subscription: Subscription;

  constructor(private store$: Store<AppState>,
    public router: Router) {
  }

  ngOnInit() {
    this.subscription = this.store$.select(selectCurrentUser)
      .subscribe( user => {
        this.currentUser = user;
      });
  }

  logout() {
    this.store$.dispatch(new LogOut());
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
