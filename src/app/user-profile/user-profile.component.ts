import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { FetchApiDataService } from '../fetch-api-data.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit, AfterViewInit {
  user: any;
  username!: string;
  password!: string;
  email!: string;
  birthdate!: string;
  movies!: any[];
  favoriteMovies: any[] = [];

  @ViewChild('favoritesContainer') favoritesContainer!: ElementRef;
  isDown = false;
  startX = 0;
  scrollLeft = 0;

  constructor(
    private http: HttpClient,
    private router: Router,
    private fetchApiData: FetchApiDataService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.getUser();
  }

  getUser(): void {
    this.fetchApiData.getLoggedInUser().subscribe((response: any) => {
      this.user = response;
      this.username = this.user.username;
      this.email = this.user.email;
      this.birthdate = new Date(this.user.birthday).toISOString().split('T')[0];

      this.fetchApiData.getAllMovies().subscribe((response: any) => {
        this.favoriteMovies = response.filter(
          (m: { _id: any }) => this.user.favorites.indexOf(m._id) >= 0
        );
      });
    });
  }

  getProfileTitle(): string {
    return this.user?.username ? `${this.user.username}'s Profile` : '';
  }

  handleUpdate(): void {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });

    const body = {
      username: this.username,
      password: this.password,
      email: this.email,
      birthday: this.birthdate,
    };

    this.http
      .put(
        `https://dark-blue-lizard-kilt.cyclic.app/users/${this.user.username}`,
        body,
        { headers }
      )
      .subscribe({
        next: (data: any) => {
          alert('Profile updated successfully!');
          localStorage.setItem('user', JSON.stringify(data));
          this.user = data;
        },
        error: (error) => console.log(error),
      });
  }

  handleDelete(): void {
    const confirmDeletion = window.confirm(
      'Are you sure you want to delete your account?'
    );
    if (!confirmDeletion) {
      return;
    }

    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    this.http
      .delete(
        `https://dark-blue-lizard-kilt.cyclic.app/users/${this.user.username}`,
        { headers }
      )
      .subscribe({
        next: (data) => {
          alert('Account deleted.');
          localStorage.removeItem('user');
          localStorage.removeItem('token');
          this.router.navigate(['/login']);
        },
        error: (error) => console.log(error),
      });
  }

  sanitizeImageUrl(imageUrl: string): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl(imageUrl);
  }

  ngAfterViewInit(): void {
    const element = this.favoritesContainer.nativeElement;

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
      element.scrollLeft += e.deltaY;
    });
  }
}
