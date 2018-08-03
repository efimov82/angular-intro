import { Injectable, Inject } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SESSION_STORAGE, StorageService } from 'angular-webstorage-service';

const STORAGE_KEY = 'local_auth_user';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor (@Inject(SESSION_STORAGE) private storage: StorageService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // add authorization header with jwt token if available
    // console.log(this.storage.get(STORAGE_KEY));

    let currentUser = this.storage.get(STORAGE_KEY);
    if (currentUser && currentUser.authToken) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${currentUser.authToken}`
        }
      });
    }

    return next.handle(request);
  }
}
