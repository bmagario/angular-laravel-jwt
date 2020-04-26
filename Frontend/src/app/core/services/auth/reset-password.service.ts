// Angular imports
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

// Environment
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ResetPasswordService {

  constructor(private http: HttpClient) { }

  sendPasswordResetLink(email: string) {
    return this.http.post<any>(environment.api + '/api/reset-link', { email })
    .pipe(map(response => {
    }));
  }

  resetPassword(email: string, password: string, resetToken: string) {
    return this.http.post<any>(environment.api + '/api/reset-password',
    { email, password, resetToken })
    .pipe(map(response => {
    }));
  }
}
