import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/retry';
import 'rxjs/add/operator/catch';

import * as fromRoot from '../app.reducers';
import * as UIActions from '../ui/ui.actions';

@Injectable()
export class ServerErrorsInterceptor implements HttpInterceptor {

  constructor(
    private store: Store<fromRoot.State>
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
     // If the call fails, retry until 3 times before throwing an error
    return next.handle(request)
    .retry(3)
    .catch(err => {
      this.store.dispatch(new UIActions.ShowNotification(
        'Sorry. A Network-Error has occured while request has been proceeding. Please inform us about it and we will fix it ASAP.'
      ));
      return Observable.throw(err);
    });
  }
}
