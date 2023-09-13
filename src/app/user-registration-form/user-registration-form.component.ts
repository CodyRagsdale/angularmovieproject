// src/app/user-registration-form/user-registration-form.component.ts

import { Component, OnInit, Input } from '@angular/core';

// You'll use this import to close the dialog on success
import { MatDialogRef } from '@angular/material/dialog';

// This import brings in the API calls we created in 6.2
import { FetchApiDataService } from '../fetch-api-data.service';

// This import is used to display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';

/**
 * @component UserRegistrationFormComponent
 * Component for registering a new user.
 */
@Component({
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.scss'],
})
export class UserRegistrationFormComponent implements OnInit {
  /**
   * User data input for registration.
   * @type {{ username: string, password: string, email: string, birthday: string }}
   */
  @Input() userData = { username: '', password: '', email: '', birthday: '' };

  /**
   * @constructor
   * @param {FetchApiDataService} fetchApiData - Service to call API
   * @param {MatDialogRef} dialogRef - Reference to dialog
   * @param {MatSnackBar} snackBar - Snackbar notifications
   */
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  /**
   * Registers a new user by sending the form data to the server.
   */
  registerUser(): void {
    console.log('Sending this data to server:', this.userData); // Debugging line
    this.fetchApiData.userRegistration(this.userData).subscribe({
      next: (result) => {
        console.log('Response from server:', result); // Debugging line
        this.dialogRef.close();
        this.snackBar.open('User registered successfully!', 'OK', {
          duration: 2000,
        });
      },

      // Error handling
      error: (error) => {
        console.log('Error from server:', error); // Debugging line
        this.snackBar.open(error, 'OK', {
          duration: 2000,
        });
      },
    });
  }
}
