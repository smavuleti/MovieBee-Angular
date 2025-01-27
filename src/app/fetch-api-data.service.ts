import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError, catchError } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * Base URL for the API used in the client application.
 */
const apiUrl = 'https://smavuleti-moviebee-479d2e8d7a6f.herokuapp.com/';

/**
 * Service for interacting with the MovieBee API.
 */
@Injectable({
  providedIn: 'root',
})
export class FetchApiDataService {
    /**
   * Injects the HttpClient module for API interactions.
   * @param http - Angular's HttpClient for making HTTP requests.
   */
  constructor(private http: HttpClient) {}
  /**
   * Registers a new user.
   * @param userDetails - Object containing the user's registration details.
   * @returns Observable of the API response.
   */  public userRegistration(userDetails: any): Observable<any> {
    const formattedDetails = {
      Username: userDetails.Username,
      UserPassword: userDetails.Password,
      UserEmail: userDetails.Email,
      UserBirthday: new Date(userDetails.Birthday).toISOString(),
    };
    return this.http
      .post(apiUrl + 'users', formattedDetails)
      .pipe(catchError(this.handleError));
  }

    /**
   * Logs in an existing user.
   * @param userDetails - Object containing the user's login details.
   * @returns Observable of the API response.
   */
  public userLogin(userDetails: any): Observable<any> {
    // Format the user details to match the backend's expected structure
    const formattedDetails = {
      Username: userDetails.Username, // Map Email from userDetails
      UserPassword: userDetails.Password, // Map Password from userDetails
    };

    return this.http
      .post(apiUrl + 'login', formattedDetails)
      .pipe(catchError(this.handleError));
  }
  /**
   * Retrieves the currently logged-in user's data from localStorage.
   * @returns User data object.
   */
  public getUser(): any {
    const user: any = JSON.parse(localStorage.getItem('user') || '');
    return {
      user,
    };
  }

   /**
   * Updates the user's information.
   * @param username - Username of the user to update.
   * @param userDetails - Updated user information.
   * @returns Observable of the API response.
   */
  public editUser(username: String, userDetails: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .put(apiUrl + 'users/' + username, userDetails, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

    /**
   * Deregisters a user.
   * @param username - Username of the user to deregister.
   * @returns Observable of the API response.
   */
  public deregisterUser(username: String): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .delete(apiUrl + 'users/' + username, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

    /**
   * Retrieves the favorite movies of the currently logged-in user.
   * @returns Object containing the user's favorite movies.
   */
  public getUserFavoriteMovies(): any {
    const user: any = JSON.parse(localStorage.getItem('user') || '');
    return {
      user: user.UserFavoriteMovies,
    };
  }

    /**
   * Adds a movie to the user's favorites.
   * @param username - Username of the user.
   * @param movieId - ID of the movie to add.
   * @returns Observable of the API response.
   */
  public addFavoriteMovie(username: String, movieId: String): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .post(
        `${apiUrl}users/${username}/favorites`,
        { _id: movieId },
        {
          headers: new HttpHeaders({
            Authorization: 'Bearer ' + token,
          }),
        }
      )
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

    /**
   * Removes a movie from the user's favorites.
   * @param username - Username of the user.
   * @param movieId - ID of the movie to remove.
   * @returns Observable of the API response.
   */
  public removeFavoriteMovie(
    username: String,
    movieId: String
  ): Observable<any> {
    const token = localStorage.getItem('token') || '';
    if (!token) {
      console.error('No token found. Authorization header will be missing.');
      return throwError(() => new Error('Authorization token is missing'));
    }

    return this.http
      .request('delete', `${apiUrl}users/${username}/favorites`, {
        body: { _id: movieId }, // Send the movie ID in the request body
        headers: new HttpHeaders({
          Authorization: `Bearer ${token}`, // Authorization token
        }),
      })
      .pipe(
        map((data) => {
          return data; // Return updated user data
        }),
        catchError((error) => {
          console.error('Error removing movie from favorites:', error);
          return this.handleError(error); // Custom error handling
        })
      );
  }

    /**
   * Fetches all movies from the API.
   * @returns Observable of the list of all movies.
   */
  public getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'allMovies', {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(
        // map(this.extractResponseData),
        map((data) => {
          return data;
        }),
        // catchError(this.handleError)
        catchError((error) => {
          return this.handleError(error);
        })
      );
  }

    /**
   * Fetches details of a specific movie.
   * @param movietitle - Title of the movie to fetch.
   * @returns Observable of the movie details.
   */
  public getMovie(movietitle: String): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'movies/' + movietitle, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

      /**
   * Fetches details of a specific movie.
   * @param movieDirector - Director of the movie to fetch.
   * @returns Observable of the director details.
   */
  public getMovieDirector(movieDirector: String): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'movies/director/' + movieDirector, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

     /**
   * Fetches details of a specific movie.
   * @param movieGenre - Genre of the movie to fetch.
   * @returns Observable of the Genre details.
   */
  public getMovieGenre(movieGenre: String): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'movies/genre/' + movieGenre, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }


  /**
   * Handles HTTP errors.
   * @param error - The HTTP error response.
   * @returns Observable that throws an error.
   */

  private handleError(error: HttpErrorResponse): Observable<never> {
    // Check if the error is a client-side or network error
    if (error.error instanceof ErrorEvent) {
      // Log client-side errors (network issues, etc.)
      console.error(
        'A client-side or network error occurred:',
        error.error.message
      );
    } else {
      // Log server-side errors (HTTP status codes)
      console.error(`Error Status code: ${error.status}`);

      // Handle different error structures, possibly without a 'message' field
      if (error.error) {
        if (typeof error.error === 'string') {
          // If the error is a string, log it directly
          console.error(`Error body: ${error.error}`);
        } else if (error.error.message) {
          // If there's a 'message' field in the error body, log that
          console.error(`Error body message: ${error.error.message}`);
        } else {
          // If no specific message, just log the whole error body
          console.error(`Error body is:`, error.error);
        }
      } else {
        console.error('No error message returned');
      }
    }

    // Return a user-friendly message
    return throwError('Something bad happened; please try again later.');
  }
  // Extract data from a successful response
  private extractResponseData(res: any): any {
    const body = res;
    return body || {}; // Fallback to empty object if no body
  }
}
