import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SESSION_STORAGE, StorageService } from 'angular-webstorage-service';

import { User } from '@app/shared/interfaces';
import { Observable } from 'rxjs';
import { map }  from 'rxjs/operators';

import { environment } from '@environments/environment';

// key that is used to access the data in local storage
const STORAGE_KEY = 'local_auth_user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  endPoint = `${environment.restEndPoint}/auth`;
  currentUser: User = null;

  constructor(
    private http: HttpClient,
    @Inject(SESSION_STORAGE) private storage: StorageService
  ){
    let data = this.storage.get(STORAGE_KEY);
    if (data) {
      this.currentUser = <User>data;
    }
  }

  public login(email: string, password: string): Observable<boolean> {
    let url = this.endPoint + '/login';
    return this.http.post(url, { email, password } )
      .pipe(
        map(response => {
          if (response['success']) {
            this.currentUser = { email: email, authToken: response['token'] };
            this.storage.set(STORAGE_KEY, this.currentUser);

            return true;
          } else {
            return false;
          }
        })
    );
  }

  public logout(): void {
    // TODO implement REST API logic
    this.storage.set(STORAGE_KEY, null);

    this.currentUser = null;
  }

  public isAuthenticated(): boolean {
    return this.currentUser && this.currentUser.authToken != '';
  }

  public getAuthUser(): User|null {
    return this.currentUser;
  }
}
