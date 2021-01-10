import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  isLoggedIn = false;
  constructor(private http: HttpClient) {}

  createAccount(data: { email: string; username: string; password: string }) {
    return this.http.post('http://localhost:3000/api/auth/register', data);
  }
}
