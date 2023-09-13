import { Component } from '@angular/core';
import { AppNavbarComponent } from './app-navbar/app-navbar.component';

/**
 * @component AppComponent
 * The root component of the application.
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  /**
   * The title of the application.
   * @type {string}
   */
  title = 'myFlix-Angular-client';
}
