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

  private extractResponseData(res: Response | Object): any {
    const body = res;
    return body || {};
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

  // Get logged-in user
  public getLoggedInUser(): Observable<any> {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (user && user.username) {
      return this.getUser(user.username);
    }
    return throwError('User not found');
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

  // Get favorite movies for a user
  public getFavorites(username: string): Observable<any> {
    return this.http
      .get(apiUrl + 'users/' + username + '/favorites', {
        headers: this.createAuthHeader(),
      })
      .pipe(catchError(this.handleError));
  }

  // Add or Remove a movie from user's favorites
  addToFavorites(username: string, movieId: string): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http
      .post(
        `https://dark-blue-lizard-kilt.cyclic.app/users/${username}/movies/${movieId}`,
        {},
        { headers }
      )
      .pipe(map(this.extractResponseData), catchError(this.handleError))
      .pipe(
        map((response: any) => {
          // Update the local user object to match the backend state
          const user = JSON.parse(localStorage.getItem('user') || '{}');
          user.favorites.push(movieId); // Change this line
          localStorage.setItem('user', JSON.stringify(user));
          return response;
        })
      );
  }

  removeFromFavorites(username: string, movieId: string): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http
      .delete(
        `https://dark-blue-lizard-kilt.cyclic.app/users/${username}/movies/${movieId}`,
        { headers }
      )
      .pipe(map(this.extractResponseData), catchError(this.handleError))
      .pipe(
        map((response: any) => {
          // Update the local user object to match the backend state
          const user = JSON.parse(localStorage.getItem('user') || '{}');
          const index = user.favorites.indexOf(movieId); // Change this line
          if (index >= 0) {
            user.favorites.splice(index, 1); // And this line
          }
          localStorage.setItem('user', JSON.stringify(user));
          return response;
        })
      );
  }

  isFavoriteMovie(movieId: string): boolean {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return user.favorites.indexOf(movieId) >= 0;
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
