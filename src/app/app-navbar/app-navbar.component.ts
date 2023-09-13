// src/app/app-navbar/app-navbar.component.ts

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

/**
 * AppNavbarComponent - A component for the navigation bar.
 */
@Component({
  selector: 'app-navbar',
  templateUrl: './app-navbar.component.html',
  styleUrls: ['./app-navbar.component.scss'],
})
export class AppNavbarComponent implements OnInit {
  /** Current URL in the application */
  private currentUrl: string;

  /**
   * @param router - Angular Router for navigation.
   */
  constructor(public router: Router) {
    this.currentUrl = '';
  }

  /** Angular OnInit lifecycle hook */
  ngOnInit(): void {
    // Listen for route changes to update the current URL.
    this.router.events.subscribe(() => {
      this.currentUrl = this.router.url;
    });
  }

  /**
   * Fetches the current URL.
   * @returns - Current URL as a string.
   */
  public getCurrentUrl(): string {
    return this.currentUrl;
  }

  /**
   * Navigates to the profile page.
   */
  navigateToProfile(): void {
    this.router.navigate(['/profile']);
  }

  /**
   * Navigates to the movies list page.
   */

  navigateToMovies(): void {
    this.router.navigate(['/movies']);
  }

  /**
   * Logs out the user and navigates to the welcome page.
   */
  logout(): void {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    sessionStorage.removeItem('dontShowWelcomeDialog');
    this.router.navigate(['/welcome']);
  }
}
