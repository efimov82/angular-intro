import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SESSION_STORAGE, StorageService } from 'angular-webstorage-service';

import { User } from '@app/shared/interfaces';
import { Observable, of } from 'rxjs';

// key that is used to access the data in local storage
const STORAGE_KEY = 'local_auth_user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  endPoint = 'http://localhost:3000/auth';
  currentUser: User = null;

  constructor(
    private http: HttpClient,
    @Inject(SESSION_STORAGE) private storage: StorageService
  ){
    let data = this.storage.get(STORAGE_KEY);
    if (data) {
      this.currentUser = <User>data;
    }
    // else {
    //   this.currentUser = {id:0, email:'default', authToken: 'authToken123'};
    // }
  }

  public login(email: string, password: string):boolean {
    // TODO implement REST API logic
    if (email !== 'test@gmail.com' && password !== '123456') {
      return false;
    }

    let user = <User>{
      id:0,
      email:email,
      authToken: 'authToken123'
    };
    this.storage.set(STORAGE_KEY, user);

    return true;
  }

  public logout():void {
    // TODO implement REST API logic
    this.storage.set(STORAGE_KEY, null);

    this.currentUser = null;
  }

  public isAuthenticated():boolean {
    return this.currentUser && this.currentUser.authToken != '';
  }

  public getAuthUser(): Observable<User|null> {
    return of(this.currentUser);
  }
}
