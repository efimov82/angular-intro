import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '@shared/services';
import { User } from '@app/shared/interfaces';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnDestroy {
  currentUser: User;
  subscription: Subscription;

  constructor(private authService: AuthService) {
    this.subscription = authService.getAuthUser()
      .subscribe( user => this.currentUser = user );
  }

  public isUserAuth(): boolean {
    return this.authService.isAuthenticated();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
