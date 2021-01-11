import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  isLoggedIn: boolean;
  loggedInSub: Subscription;
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.loggedInSub = this.authService.userData.subscribe((data) => {
      if (!data) this.isLoggedIn = false;
      else this.isLoggedIn = true;
    });
  }

  onLogout() {
    this.authService.logout();
  }

  ngOnDestroy() {
    this.loggedInSub.unsubscribe();
  }
}
