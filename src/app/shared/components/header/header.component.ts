import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '@app/auth/services';
import { User } from '@app/shared/interfaces';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  currentUser: User;
  subscription: Subscription;

  constructor(private authService: AuthService) {
    
    this.subscription = authService.getAuthUserObservable()
      .subscribe( user => {
        console.log('constuctor: user=', user);
        this.currentUser = user;
      });
  }

  ngOnInit() {
    this.currentUser = this.authService.getAuthUser();
  }

  public isUserAuth(): boolean {
    return this.authService.isAuthenticated();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
