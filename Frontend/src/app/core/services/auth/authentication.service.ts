// Angular imports
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

// Environment
import { environment } from '@env/environment';

// Services
import { StorageService } from '../storage/storage.service';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  currentUser: Observable<any>;
  private currentUserSubject: BehaviorSubject<any>;

  constructor(
    private http: HttpClient,
    private storageService: StorageService
    ) {
    this.currentUserSubject = new BehaviorSubject<any>(
      JSON.parse(this.storageService.getItem('currentUser'))
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue() {
    return this.currentUserSubject.value;
  }

  /**
   * Request to authenticate user
   * @param username Username to authenticate
   * @param password password to authenticate
   */
  login(email: string, password: string, captcha: string) {
    return this.http.post<any>(environment.api + '/api/login', { email, password, captcha })
    .pipe(map(currentUser => {
      if (currentUser.user) {
        this.storageService.setItem('currentUser', JSON.stringify(currentUser.user));
        this.currentUserSubject.next(currentUser.user);
      }
      return currentUser.user;
    // }),
    // catchError(this.handleError)
    }));
  }

  handleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }

  logout() {
    return this.http.post<any>(environment.api + '/api/logout', { })
    .pipe(map(data => {
      this.storageService.removeItem('currentUser');
      this.currentUserSubject.next(null);
    }));
  }

  isLoggedIn(): boolean {
    return this.storageService.getItem('currentUser') !== null;
  }
}
