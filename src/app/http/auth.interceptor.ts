import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { AuthService } from '../logic/services/auth/auth.service';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private injector: Injector) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const auth = this.injector.get(AuthService);
    if (auth.isAuth()) {
      const token = auth.getToken();
      const request = req.clone({headers: req.headers.set('Authorization', `Bearer ${token}`)});
      return next.handle(request);
    }
    return next.handle(req);
  }
}
