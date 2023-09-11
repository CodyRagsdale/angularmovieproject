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

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
})
export class MovieCardComponent implements OnInit, AfterViewInit {
  // Added OnInit
  @ViewChild('movieContainer') movieContainer!: ElementRef;
  isDown = false;
  startX = 0; // Initialized
  scrollLeft = 0; // Initialized
  movies: any[] = [];

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar, // Added
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    const storedValue = sessionStorage.getItem('dontShowWelcomeDialog');
    if (storedValue !== 'true') {
      this.openWelcomeDialog();
    }
    this.getMovies();
  }

  openWelcomeDialog(): void {
    this.dialog.open(MovieWelcomeDialogComponent, {
      width: '650px',
      height: '250px',
    });
  }

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
    });
  }

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

  isFavorite(id: string): boolean {
    return this.fetchApiData.isFavoriteMovie(id); // Make sure you implement this in your FetchApiDataService
  }

  toggleFavorite(id: string): void {
    if (this.isFavorite(id)) {
      this.removeFavorite(id);
    } else {
      this.addFavorite(id);
    }
  }

  sanitizeImageUrl(imageUrl: string): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl(imageUrl);
  }

  // Remaining methods for drag scrolling
  ngAfterViewInit(): void {
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
