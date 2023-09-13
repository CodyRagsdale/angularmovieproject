// src/app/movie-card/movie-card.component.ts
import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MovieWelcomeDialogComponent } from '../movie-welcome-dialog/movie-welcome-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar'; // Added
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

/**
 * MovieCardComponent - A component to display a list of movie cards.
 */
@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
})
export class MovieCardComponent implements OnInit, AfterViewInit {
  /** Reference to the movie container for drag scrolling */
  @ViewChild('movieContainer') movieContainer!: ElementRef;

  /** State variables for drag scrolling */
  isDown = false;
  startX = 0; // Initialized
  scrollLeft = 0; // Initialized

  /** Array to hold movies data */
  movies: any[] = [];

  /**
   * @param fetchApiData - Service to fetch API data.
   * @param dialog - Material Dialog for showing welcome messages.
   * @param snackBar - Material Snackbar for notifications.
   * @param sanitizer - Angular's DomSanitizer for bypassing Angular's built-in sanitization.
   */
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar, // Added
    private sanitizer: DomSanitizer
  ) {}

  /** Angular OnInit lifecycle hook */
  ngOnInit(): void {
    const storedValue = sessionStorage.getItem('dontShowWelcomeDialog');
    if (storedValue !== 'true') {
      this.openWelcomeDialog();
    }
    this.getMovies();
  }

  /**
   * Opens the welcome dialog.
   */
  openWelcomeDialog(): void {
    this.dialog.open(MovieWelcomeDialogComponent, {
      width: '650px',
      height: '250px',
    });
  }

  /**
   * Fetches all movies.
   */
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
    });
  }

  /**
   * Adds a movie to the favorites list.
   * @param id - The movie ID.
   */
  addFavorite(id: string): void {
    const username = JSON.parse(localStorage.getItem('user') || '{}').username;
    this.fetchApiData
      .addToFavorites(username, id)
      .subscribe((Response: any) => {
        this.snackBar.open('Added to favorites', 'OK', {
          duration: 2000,
        });
      });
  }

  /**
   * Removes a movie from the favorites list.
   * @param id - The movie ID.
   */
  removeFavorite(id: string): void {
    const username = JSON.parse(localStorage.getItem('user') || '{}').username;
    this.fetchApiData
      .removeFromFavorites(username, id)
      .subscribe((Response: any) => {
        this.snackBar.open('Removed from favorites', 'OK', {
          duration: 2000,
        });
      });
  }

  /**
   * Checks if a movie is in the favorites list.
   * @param id - The movie ID.
   * @returns - Boolean indicating if the movie is in the favorites list.
   */
  isFavorite(id: string): boolean {
    return this.fetchApiData.isFavoriteMovie(id); // Make sure you implement this in your FetchApiDataService
  }

  /**
   * Toggles a movie in or out of the favorites list.
   * @param id - The movie ID.
   */
  toggleFavorite(id: string): void {
    if (this.isFavorite(id)) {
      this.removeFavorite(id);
    } else {
      this.addFavorite(id);
    }
  }

  /**
   * Sanitizes an image URL to bypass Angular's built-in sanitization.
   * @param imageUrl - The image URL.
   * @returns - Sanitized URL as SafeUrl.
   */
  sanitizeImageUrl(imageUrl: string): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl(imageUrl);
  }

  /** Angular AfterViewInit lifecycle hook */
  ngAfterViewInit(): void {
    // Drag scrolling and mouse scrollwheel left/right implementation
    const element = this.movieContainer.nativeElement;

    element.addEventListener('mousedown', (e: MouseEvent) => {
      this.isDown = true;
      this.startX = e.pageX - element.offsetLeft;
      this.scrollLeft = element.scrollLeft;
    });

    element.addEventListener('mouseleave', () => {
      this.isDown = false;
    });

    element.addEventListener('mouseup', () => {
      this.isDown = false;
    });

    element.addEventListener('mousemove', (e: MouseEvent) => {
      if (!this.isDown) return;
      e.preventDefault();
      const x = e.pageX - element.offsetLeft;
      const walk = (x - this.startX) * 3; // Scroll fast
      element.scrollLeft = this.scrollLeft - walk;
    });

    element.addEventListener('wheel', (e: WheelEvent) => {
      e.preventDefault();
      element.scrollLeft += e.deltaY * 1.0;
    });
  }
}
