import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

const apiUrl = 'https://dark-blue-lizard-kilt.cyclic.app/';

@Injectable({
  providedIn: 'root',
})
export class FetchApiDataService {
  constructor(private http: HttpClient) {}

  private createAuthHeader(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({ Authorization: 'Bearer ' + token });
  }

  // User registration
  public userRegistration(userData: any): Observable<any> {
    return this.http
      .post(apiUrl + 'users', userData)
      .pipe(catchError(this.handleError));
  }

  // User login
  public userLogin(userData: any): Observable<any> {
    return this.http
      .post(apiUrl + 'login', userData)
      .pipe(catchError(this.handleError));
  }

  // Get all movies
  public getAllMovies(): Observable<any> {
    return this.http
      .get(apiUrl + 'movies', { headers: this.createAuthHeader() })
      .pipe(catchError(this.handleError));
  }

  // Get one movie by title
  public getMovie(title: string): Observable<any> {
    return this.http
      .get(apiUrl + 'movies/' + title, { headers: this.createAuthHeader() })
      .pipe(catchError(this.handleError));
  }

  // Get director
  public getDirector(name: string): Observable<any> {
    return this.http
      .get(apiUrl + 'directors/' + name, { headers: this.createAuthHeader() })
      .pipe(catchError(this.handleError));
  }

  // Get genre
  public getGenre(name: string): Observable<any> {
    return this.http
      .get(apiUrl + 'genres/' + name, { headers: this.createAuthHeader() })
      .pipe(catchError(this.handleError));
  }

  // Get user
  public getUser(username: string): Observable<any> {
    return this.http
      .get(apiUrl + 'users/' + username, { headers: this.createAuthHeader() })
      .pipe(catchError(this.handleError));
  }

  // Get favourite movies for a user
  public getFavorites(username: string): Observable<any> {
    return this.http
      .get(apiUrl + 'users/' + username + '/favorites', {
        headers: this.createAuthHeader(),
      })
      .pipe(catchError(this.handleError));
  }

  // Add a movie to favorite Movies
  public addFavorite(username: string, movieId: string): Observable<any> {
    return this.http
      .post(
        apiUrl + 'users/' + username + '/favorites/' + movieId,
        {},
        { headers: this.createAuthHeader() }
      )
      .pipe(catchError(this.handleError));
  }

  // Edit user
  public editUser(username: string, userDetails: any): Observable<any> {
    return this.http
      .put(apiUrl + 'users/' + username, userDetails, {
        headers: this.createAuthHeader(),
      })
      .pipe(catchError(this.handleError));
  }

  // Delete user
  public deleteUser(username: string): Observable<any> {
    return this.http
      .delete(apiUrl + 'users/' + username, {
        headers: this.createAuthHeader(),
      })
      .pipe(catchError(this.handleError));
  }

  // Delete a movie from the favorite movies
  public deleteFavorite(username: string, movieId: string): Observable<any> {
    return this.http
      .delete(apiUrl + 'users/' + username + '/favorites/' + movieId, {
        headers: this.createAuthHeader(),
      })
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` + `Error body is: ${error.error}`
      );
    }
    return throwError('Something bad happened; please try again later.');
  }
}
