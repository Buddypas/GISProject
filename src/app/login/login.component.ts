import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(20),
    ]),
  });

  constructor(private http:HttpClient) {}

  ngOnInit(): void {}

  getErrorMessage(type: string): string {
    if (type == 'email') {
      if (this.loginForm.get('email').hasError('required'))
        return 'You must enter an email';

      return this.loginForm.get('email').hasError('email')
        ? 'Not a valid email'
        : '';
    } else {
      if (this.loginForm.get('password').hasError('required'))
        return 'You must enter a password';

      return this.loginForm.get('password').hasError('minlength')
        ? 'Invalid password length'
        : '';
    }
  }

  onSubmit() {

  }
}
