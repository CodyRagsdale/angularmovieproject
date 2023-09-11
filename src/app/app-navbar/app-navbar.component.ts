// src/app/app-navbar/app-navbar.component.ts

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './app-navbar.component.html',
  styleUrls: ['./app-navbar.component.scss'],
})
export class AppNavbarComponent implements OnInit {
  private currentUrl: string;

  constructor(public router: Router) {
    this.currentUrl = '';
  }

  ngOnInit(): void {
    this.router.events.subscribe(() => {
      this.currentUrl = this.router.url;
    });
  }

  public getCurrentUrl(): string {
    return this.currentUrl;
  }

  navigateToProfile(): void {
    this.router.navigate(['/profile']);
  }

  navigateToMovies(): void {
    this.router.navigate(['/movies']);
  }

  logout(): void {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    sessionStorage.removeItem('dontShowWelcomeDialog');
    this.router.navigate(['/welcome']);
  }
}
