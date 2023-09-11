import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-movie-welcome-dialog',
  templateUrl: './movie-welcome-dialog.component.html',
  styleUrls: ['./movie-welcome-dialog.component.scss'],
})
export class MovieWelcomeDialogComponent {
  public dontShowAgain = false;

  constructor(public dialogRef: MatDialogRef<MovieWelcomeDialogComponent>) {}

  closeDialog() {
    if (this.dontShowAgain) {
      sessionStorage.setItem('dontShowWelcomeDialog', 'true');
    }
    this.dialogRef.close();
  }
}
