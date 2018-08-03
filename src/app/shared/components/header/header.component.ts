import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

import { AuthService } from '@app/auth/services';
import { User } from '@app/shared/interfaces';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  currentUser: User;
  subscription: Subscription;

  constructor(private authService: AuthService,
    public router: Router) {
  }

  ngOnInit() {
    this.subscription = this.authService.getAuthUser()
      .subscribe( user => {
        this.currentUser = user;
      });
  }

  public isUserAuth(): boolean {
    return this.authService.isAuthenticated();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
