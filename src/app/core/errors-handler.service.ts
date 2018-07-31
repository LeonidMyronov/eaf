import { ErrorHandler, Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Store } from '@ngrx/store';

import * as fromRoot from '../app.reducers';
import * as UIActions from '../ui/ui.actions';
@Injectable()
export class ErrorsHandler implements ErrorHandler {

  constructor(
    private store: Store<fromRoot.State>
  ) {}

  handleError(error: Error | HttpErrorResponse) {
    if (!(error instanceof HttpErrorResponse)) {
      // Handle Client Error (Angular Error, ReferenceError...)
      this.store.dispatch(new UIActions
        .ShowNotification('Sorry. A Error has occured. Please inform us about it and we will fix it ASAP.'));
    }
    console.error('Error happens: ', error);
  }
}
