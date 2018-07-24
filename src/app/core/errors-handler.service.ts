import { ErrorHandler, Injectable } from '@angular/core';

@Injectable()
export class ErrorsHandler implements ErrorHandler {
  handleError(error: Error) {
     console.error('Error happens: ', error);
  }
}
