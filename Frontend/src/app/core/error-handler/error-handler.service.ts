// Angular imports
import {ErrorHandler, Injectable} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';

@Injectable()
export class ErrorHandlerService implements ErrorHandler {

  constructor() { }

  handleError(error: any) {
    switch (error.constructor) {
      case HttpErrorResponse: {
        break;
      }
      case TypeError: {
        console.error('Type Error! ', error.message);
        break;
      }
      case Error: {
        console.error('General Error!. ', error.message);
        break;
      }
      default: {
        console.error('Something went Wrong! ', error);
        break;
      }
    }
    throw error;
  }

}
