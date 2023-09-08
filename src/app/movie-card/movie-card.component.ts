// src/app/movie-card/movie-card.component.ts
import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

import { MatDialog } from '@angular/material/dialog';
import { MovieDialogComponent } from '../movie-dialog/movie-dialog.component';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
})
export class MovieCardComponent implements AfterViewInit {
  @ViewChild('movieContainer') movieContainer!: ElementRef;
  isDown = false;
  startX: number = 0; // Initialized
  scrollLeft: number = 0; // Initialized
  movies: any[] = [];

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.getMovies();
  }

  sanitizeImageUrl(imageUrl: string): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl(imageUrl);
  }

  openDialog(event: MouseEvent, title: string, content: string): void {
    const rect = (event.target as Element).getBoundingClientRect();
    const dialogRef = this.dialog.open(MovieDialogComponent, {
      width: '250px',
      data: { title, content },
      position: { left: `${rect.left}px`, top: `${rect.top}px` },
    });
  }

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }

  ngAfterViewInit(): void {
    const element = this.movieContainer.nativeElement;

    element.addEventListener('mousedown', (e: MouseEvent) => {
      // Added type
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
      // Added type
      if (!this.isDown) return;
      e.preventDefault();
      const x = e.pageX - element.offsetLeft;
      const walk = (x - this.startX) * 3; // Scroll fast
      element.scrollLeft = this.scrollLeft - walk;
    });
  }
}
