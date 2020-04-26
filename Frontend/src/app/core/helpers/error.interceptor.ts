// Angular imports
import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

// Services
import { AuthenticationService } from '../services/auth/authentication.service';
import { Router } from '@angular/router';
import { NotificationService } from '../services/notification/notification.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(
    private authenticationService: AuthenticationService,
    private notifyService: NotificationService,
    private router: Router,
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError(err => {
      if (err.status === 401) {
        this.authenticationService.logout();
        this.router.navigate(['/login']);
      } else if (err.status === 403) {
          this.notifyService.showWarning(
            'No posee permisos para acceder a este recurso',
            'Advertencia'
          );
      } else if (err.status === 429) {
        this.notifyService.showWarning(
          'Ha intentado más de 5 veces, por favor espere un minuto para volver a intentar',
          'Advertencia'
        );
      } else if (err.status === 0 || err.status === 500) {
        this.notifyService.showError(
          'Ocurrió un error en el servidor, intente nuevamente',
          'Error'
        );
      }

      const error = {
        message: err.error?.message,
        statusText: err.statusText,
        status: err.status
      };

      return throwError(error);
    }));
  }
}
