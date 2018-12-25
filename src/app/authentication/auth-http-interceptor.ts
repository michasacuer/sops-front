import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';

@Injectable()
export class AuthHttpInterceptor implements HttpInterceptor {

  constructor(public auth: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const options = {
      setHeaders: {
        // 'Content-Type' : 'application/json; charset=utf-8',
        // 'Accept'       : 'application/json',
      },
      // withCredentials: true
    };

    const authHeaderValue = this.auth.getAuthorizationHeaderValue();
    if (authHeaderValue) {
        options.setHeaders['Authorization'] = `Bearer ${authHeaderValue}`;
    }
    req = req.clone(options);

    return next.handle(req);
  }
}
