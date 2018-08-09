import { User } from '@app/shared/interfaces/user';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '@environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private endPoint = `${environment.restEndPoint}/profile`;

  constructor(private http: HttpClient) { }

  public updateProfile(data: any): Observable<User|boolean> {
    return this.http.put(this.endPoint, data )
      .pipe(
        map(response => {
          if (response) {
            return <User>response;
          } else {
            return false;
          }
        })
      )
  }
}
