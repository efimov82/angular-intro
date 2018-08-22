import { LogInSuccess } from './shared/store/actions/auth';
import { Store } from '@ngrx/store';
import { AppState } from './shared/store/appState';
import { AuthService } from './auth/services/auth/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private store$: Store<AppState>
  ){}

  ngOnInit() {
    const user = this.authService.getStorageData();
    if (user) {
      this.store$.dispatch(new LogInSuccess(user)); // TODO replace for RetrieveUser() action
    }
  }
}
