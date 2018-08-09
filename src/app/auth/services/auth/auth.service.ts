import { Ability, RawRule } from '@casl/ability';
import { Inject, Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient } from '@angular/common/http';
import { SESSION_STORAGE, StorageService } from 'angular-webstorage-service';

import { User } from '@app/shared/interfaces';
import { Observable, BehaviorSubject } from 'rxjs';
import { map }  from 'rxjs/operators';

import { environment } from '@environments/environment';
import { defineAbilityFor } from '@app/shared/abilities/ability.fn';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public redirectUrl = '/';
  private endPoint = `${environment.restEndPoint}/auth`;
  private currentUser = new BehaviorSubject<User>(null);
  private _user: User = null;

  constructor(
    public jwtHelper: JwtHelperService,
    private http: HttpClient,
    @Inject(SESSION_STORAGE) private storage: StorageService,
    private abilityService: Ability
  ){
    let data = <User>this.storage.get(environment.storageKeyForUser);
    if (data && data.authToken ) { // TODO add normal type checking
      let isTokenExpired = this.jwtHelper.isTokenExpired(data.authToken);
      if (isTokenExpired) {
        this.logout();
      } else {
        this.setCurrentUser(data)
      }
    }
  }

  public login(email: string, password: string): Observable<boolean> {
    let url = this.endPoint + '/signin';
    return this.http.post(url, { email, password } )
      .pipe(
        map(response => {
          if (response['success']) {
            try {
              const data = this.jwtHelper.decodeToken(response['token']);
              const user = <User>{
                id: data['id'],
                email: email,
                nickname: response['nickname'],
                avatar: environment.restEndPoint + response['avatar'],
                authToken: response['token'],
                roles: data['roles'],
              };

              this.setCurrentUser(user);
              return true;
            } catch (e) {
              return false;
            }
          } else {
            return false;
          }
        })
    );
  }

  public logout(): void {
    this.setCurrentUser(null);
  }

  protected setCurrentUser(user: User): void {
    this.storage.set(environment.storageKeyForUser, user);

    this._user = user;
    this.updateAbilityRoles(user);
    this.currentUser.next(user);
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

  protected updateAbilityRoles(user: User): Ability {
    if (!user) {
      return this.abilityService.update([]);
    }

    const ability = defineAbilityFor(user);
    return this.abilityService.update(ability.rules);
  }
}
