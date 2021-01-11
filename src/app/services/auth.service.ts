import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

export interface AuthResponseData {
  userId: number;
  username: string;
  token: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  userData = new BehaviorSubject<AuthResponseData>(null);
  constructor(private http: HttpClient, private router: Router) {}

  createAccount(data: { email: string; username: string; password: string }) {
    return this.http.post('http://localhost:3000/api/auth/register', data);
  }

  login(data: { email: string; password: string }) {
    return this.http
      .post<AuthResponseData>('http://localhost:3000/api/auth/login', data)
      .pipe(
        // catchError(this.handleError),
        tap((resData) => {
          this.handleAuthentication(resData);
        })
      );
  }

  logout() {
    this.userData.next(null);
    this.router.navigate(['/auth']);
  }

  autoLogin() {
    const data: AuthResponseData = JSON.parse(
      localStorage.getItem('userData')
    );
    console.log("auto login parsed data: " + data);
    if (!data) return;

    const currentUserData: AuthResponseData = {
      userId: data.userId,
      token: data.token,
      username: data.username,
    };

    this.userData.next(currentUserData);

  }

  private handleAuthentication(data: AuthResponseData) {
    // const expirationMillis = Date.now() + 1000 * 60 * 60;
    localStorage.setItem('userData', JSON.stringify(data));
    this.userData.next(data);
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMessage);
    }
    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'This email exists already';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'This email does not exist.';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'This password is not correct.';
        break;
    }
    return throwError(errorMessage);
  }
}
