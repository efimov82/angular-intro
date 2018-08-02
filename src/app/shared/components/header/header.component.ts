import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '@app/auth/services';
import { User } from '@app/shared/interfaces';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  currentUser: User;
  subscription: Subscription;

  constructor(private authService: AuthService,
    public router: Router) {
  }

  ngOnInit() {
    this.currentUser = this.authService.getAuthUser();
  }

  public isUserAuth(): boolean {
    return this.authService.isAuthenticated();
  }

  logout() {
    this.authService.logout();
    this.currentUser = null; // this.authService.getAuthUser();
    this.router.navigate(['/']);
  }
}
