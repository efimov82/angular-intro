import { Inject, Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient } from '@angular/common/http';
import { SESSION_STORAGE, StorageService } from 'angular-webstorage-service';

import { User } from '@app/shared/interfaces';
import { Observable, BehaviorSubject } from 'rxjs';
import { map }  from 'rxjs/operators';

import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public redirectUrl = '/';
  private endPoint = `${environment.restEndPoint}/auth`;
  private currentUser = new BehaviorSubject<User>(null);
  private _user = null;

  constructor(
    public jwtHelper: JwtHelperService,
    private http: HttpClient,
    @Inject(SESSION_STORAGE) private storage: StorageService
  ){
    let data = this.storage.get(environment.storageKeyForUser);
    if (data && data.authToken) {
      let isTokenExpired = this.jwtHelper.isTokenExpired(data.authToken);
      if (isTokenExpired) {
        this.logout();
      } else {
        this._user = <User>data;
        this.currentUser.next(this._user);
      }
    }
  }

  public login(email: string, password: string): Observable<boolean> {
    let url = this.endPoint + '/signin';
    return this.http.post(url, { email, password } )
      .pipe(
        map(response => {
          if (response['success']) {
            this._user = { email: email, authToken: response['token'] };
            this.currentUser.next(<User>this._user);

            this.storage.set(environment.storageKeyForUser, this._user);

            return true;
          } else {
            return false;
          }
        })
    );
  }

  public logout(): void {
    this.storage.set(environment.storageKeyForUser, null);

    this._user = null;
    this.currentUser.next(null);
  }

  public isAuthenticated(): boolean {
    if (!this._user || !this._user.authToken) {
      return false;
    }

    let token = this._user.authToken;
    let isTokenExpired = this.jwtHelper.isTokenExpired(token);
    if (isTokenExpired) {
      this.logout();
    }

    return !isTokenExpired;
  }

  public getAuthUser(): Observable<User> {
    return this.currentUser;
  }
}
