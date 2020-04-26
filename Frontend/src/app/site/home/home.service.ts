// Angular imports
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(
    private http: HttpClient
  ) {}

  testAuth(): Observable<any> {
    const API_URL = environment.api + '/api/test-auth';
    return this.http.get(API_URL, {})
    .pipe(map(data => {
      return data;
    }));
  }
}
