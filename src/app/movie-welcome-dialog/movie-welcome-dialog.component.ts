import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

/**
 * MovieWelcomeDialogComponent - A dialog for the movie application that welcomes the user and informs use.
 */
@Component({
  selector: 'app-movie-welcome-dialog',
  templateUrl: './movie-welcome-dialog.component.html',
  styleUrls: ['./movie-welcome-dialog.component.scss'],
})
export class MovieWelcomeDialogComponent {
  /** Flag to control whether the dialog should not be shown again */
  public dontShowAgain = false;

  /**
   * @param dialogRef - Reference to the dialog opened.
   */
  constructor(public dialogRef: MatDialogRef<MovieWelcomeDialogComponent>) {}

  /**
   * Closes the dialog and saves 'don't show again' setting if selected.
   */
  closeDialog() {
    if (this.dontShowAgain) {
      sessionStorage.setItem('dontShowWelcomeDialog', 'true');
    }
    this.dialogRef.close();
  }
}
