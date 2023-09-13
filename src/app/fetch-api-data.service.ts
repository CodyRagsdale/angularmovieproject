/**
 * @module FetchApiDataService
 */
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

/**
 * Service responsible for all API calls to the myFlix backend.
 */
@Injectable({
  providedIn: 'root',
})
export class FetchApiDataService {
  constructor(private http: HttpClient) {}

  /**
   * Create the Authorization header for authenticated API requests.
   * @returns {HttpHeaders} - Headers with Authorization token.
   * @private
   */

  private createAuthHeader(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({ Authorization: 'Bearer ' + token });
  }

  /**
   * Helper function to extract the HTTP response data.
   * @param {Response | Object} res - The HTTP response.
   * @returns {any} - The body of the HTTP response.
   * @private
   */
  private extractResponseData(res: Response | Object): any {
    const body = res;
    return body || {};
  }

  /**
   * Register a new user.
   * @param {any} userData - The data for the new user.
   * @returns {Observable<any>} - Observable with the API's response.
   */
  public userRegistration(userData: any): Observable<any> {
    return this.http
      .post(apiUrl + 'users', userData)
      .pipe(catchError(this.handleError));
  }

  /**
   * Log a user in.
   * @param {any} userData - The login data.
   * @returns {Observable<any>} - Observable with the API's response.
   */
  public userLogin(userData: any): Observable<any> {
    return this.http
      .post(apiUrl + 'login', userData)
      .pipe(catchError(this.handleError));
  }

  /**
   * Fetch details of the currently logged-in user.
   * @returns {Observable<any>} - Observable with the user's details.
   */
  public getLoggedInUser(): Observable<any> {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (user && user.username) {
      return this.getUser(user.username);
    }
    return throwError('User not found');
  }

  /**
   * Fetch all movies from the API.
   * @returns {Observable<any>} - Observable containing all movies.
   */
  public getAllMovies(): Observable<any> {
    return this.http
      .get(apiUrl + 'movies', { headers: this.createAuthHeader() })
      .pipe(catchError(this.handleError));
  }

  /**
   * Fetch a specific movie by its title.
   * @param {string} title - The movie's title.
   * @returns {Observable<any>} - Observable containing the movie.
   */
  public getMovie(title: string): Observable<any> {
    return this.http
      .get(apiUrl + 'movies/' + title, { headers: this.createAuthHeader() })
      .pipe(catchError(this.handleError));
  }

  /**
   * Fetch information about a director by name.
   * @param {string} name - The director's name.
   * @returns {Observable<any>} - Observable containing the director's information.
   */
  public getDirector(name: string): Observable<any> {
    return this.http
      .get(apiUrl + 'directors/' + name, { headers: this.createAuthHeader() })
      .pipe(catchError(this.handleError));
  }

  /**
   * Fetch information about a genre by name.
   * @param {string} name - The genre's name.
   * @returns {Observable<any>} - Observable containing the genre's information.
   */
  public getGenre(name: string): Observable<any> {
    return this.http
      .get(apiUrl + 'genres/' + name, { headers: this.createAuthHeader() })
      .pipe(catchError(this.handleError));
  }

  /**
   * Fetch a user's profile by their username.
   * @param {string} username - The user's username.
   * @returns {Observable<any>} - Observable containing the user's details.
   */
  public getUser(username: string): Observable<any> {
    return this.http
      .get(apiUrl + 'users/' + username, { headers: this.createAuthHeader() })
      .pipe(catchError(this.handleError));
  }

  /**
   * Fetch a user's favorite movies by their username.
   * @param {string} username - The user's username.
   * @returns {Observable<any>} - Observable containing the list of favorites.
   */
  public getFavorites(username: string): Observable<any> {
    return this.http
      .get(apiUrl + 'users/' + username + '/favorites', {
        headers: this.createAuthHeader(),
      })
      .pipe(catchError(this.handleError));
  }

  /**
   * Add a movie to a user's favorites.
   * @param {string} username - The user's username.
   * @param {string} movieId - The movie ID to add.
   * @returns {Observable<any>} - Observable containing the API response.
   */
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

  /**
   * Remove a movie from a user's favorites.
   * @param {string} username - The user's username.
   * @param {string} movieId - The movie ID to remove.
   * @returns {Observable<any>} - Observable containing the API response.
   */
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

  /**
   * Checks if a movie is in the user's list of favorite movies.
   * @param {string} movieId - The ID of the movie to check.
   * @returns {boolean} - True if the movie is a favorite, false otherwise.
   */
  isFavoriteMovie(movieId: string): boolean {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return user.favorites.indexOf(movieId) >= 0;
  }

  /**
   * Update a user's profile details.
   * @param {string} username - The username of the user to edit.
   * @param {any} userDetails - The new details for the user.
   * @returns {Observable<any>} - Observable containing the API's response.
   */
  public editUser(username: string, userDetails: any): Observable<any> {
    return this.http
      .put(apiUrl + 'users/' + username, userDetails, {
        headers: this.createAuthHeader(),
      })
      .pipe(catchError(this.handleError));
  }

  /**
   * Deletes a user's account.
   * @param {string} username - The username of the user to delete.
   * @returns {Observable<any>} - Observable containing the API's response.
   */
  public deleteUser(username: string): Observable<any> {
    return this.http
      .delete(apiUrl + 'users/' + username, {
        headers: this.createAuthHeader(),
      })
      .pipe(catchError(this.handleError));
  }

  /**
   * Handle any errors from the API.
   * @param {HttpErrorResponse} error - The HTTP error.
   * @returns {Observable<never>} - Observable which throws the error.
   * @private
   */
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
