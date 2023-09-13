// src/app/user-login-form/user-login-form.component.ts
import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

/**
 * UserLoginFormComponent - A component to handle user login.
 */
@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss'],
})
export class UserLoginFormComponent implements OnInit {
  /** Input data for user login */
  @Input() userData = { username: '', password: '' };

  /**
   * @param fetchApiData - Service to fetch API data.
   * @param dialogRef - Reference to the dialog opened.
   * @param snackBar - Material Snackbar for notifications.
   * @param router - Angular Router for navigation.
   */
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar,
    private router: Router
  ) {}

  /** Angular OnInit lifecycle hook */
  ngOnInit(): void {}

  /**
   * Logs the user in and navigates to the movies page.
   */
  loginUser(): void {
    this.fetchApiData.userLogin(this.userData).subscribe({
      next: (result) => {
        this.dialogRef.close();
        localStorage.setItem('user', JSON.stringify(result.user));
        localStorage.setItem('token', result.token);
        this.snackBar.open('Login successful!', 'OK', {
          duration: 2000,
        });
        this.router.navigate(['movies']);
      },
      error: (error) => {
        this.snackBar.open(error, 'OK', {
          duration: 2000,
        });
      },
    });
  }
}
