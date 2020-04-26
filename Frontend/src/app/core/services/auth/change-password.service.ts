// Angular imports
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

// Environment
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChangePasswordService {

  constructor(private http: HttpClient) { }

  changePassword(currentPassword: string, newPassword: string): Observable<any> {
    return this.http.post<any>(environment.api + '/api/change-password',
    {
      currentPassword,
      password: newPassword
    })
    .pipe(map((response) => {
      return response;
    }));
  }
}
