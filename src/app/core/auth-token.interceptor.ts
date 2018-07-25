import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthTokenInterceptor implements HttpInterceptor {
  constructor(private injector: Injector) {}

  intercept(req: HttpRequest < any > , next: HttpHandler): Observable < HttpEvent < any >> {
      // TODO implement fetching AUTH_TOKEN
      // const system = this.injector.get(SystemService);

      const clone = req.clone({
        setHeaders: {
          'Content-Type': 'application/x-www-form-urlencoded',
          // TODO add AUTH_TOKEN here
          // 'X-XSRFToken': system.getToken()
        },
        withCredentials: true,
      });
      return next.handle(clone);
  }
}


