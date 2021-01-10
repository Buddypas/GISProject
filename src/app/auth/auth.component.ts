import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  Validators,
} from '@angular/forms';
import { checkPasswordMatch } from '../utils/utils';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {
  isLoginMode = true;
  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: [
      '',
      [Validators.required, Validators.minLength(8), Validators.maxLength(20)],
    ],
  });

  signupForm = this.fb.group(
    {
      email: ['', [Validators.required, Validators.email]],
      username: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
        ],
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(20),
        ],
      ],
      confirmPassword: ['', [Validators.required]],
    },
    { validator: checkPasswordMatch('password', 'confirmPassword') }
  );

  constructor(private http: HttpClient, private fb: FormBuilder) {}

  ngOnInit(): void {}

  getErrorMessage(formType: string, type: string): string {
    if (formType == 'login') {
      switch (type) {
        case 'email': {
          if (this.loginForm.get('email').hasError('required'))
            return 'You must enter an email';

          return this.loginForm.get('email').hasError('email')
            ? 'Not a valid email'
            : null;
        }
        case 'password': {
          if (this.loginForm.get('password').hasError('required'))
            return 'You must enter a password';

          return this.loginForm.get('password').hasError('minlength')
            ? 'Invalid password length'
            : null;
        }
      }
    } else
      switch (type) {
        case 'email': {
          if (this.signupForm.get('email').hasError('required'))
            return 'You must enter an email';

          return this.signupForm.get('email').hasError('email')
            ? 'Not a valid email'
            : null;
        }
        case 'username': {
          if (this.signupForm.get('username').hasError('required'))
            return 'You must enter a username';

          return this.signupForm.get('username').hasError('minlength') ||
            this.signupForm.get('username').hasError('maxlength')
            ? 'Invalid username length'
            : null;
        }
        case 'password': {
          if (this.signupForm.get('password').hasError('required'))
            return 'You must enter a password';

          return this.signupForm.get('password').hasError('minlength')
            ? 'Invalid password length'
            : null;
        }
        case 'confirmPassword': {
          if (this.signupForm.get('confirmPassword').hasError('required'))
            return 'You must repeat your password';

          return this.signupForm.get('confirmPassword').hasError('notSame')
            ? "Passwords don't match"
            : null;
        }
      }
  }

  onLogin() {
    console.log(this.loginForm.value);
  }

  onRegister() {
    console.log(this.signupForm.value);
  }

  onRegisterClicked() {
    this.isLoginMode = !this.isLoginMode;
  }
}
