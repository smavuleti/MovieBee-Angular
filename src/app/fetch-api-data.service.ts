import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError, catchError } from 'rxjs';
import { map } from 'rxjs/operators';

//Declaring the api url that will provide data for the client app
const apiUrl = 'https://smavuleti-moviebee-479d2e8d7a6f.herokuapp.com/';
@Injectable({
  providedIn: 'root',
})
export class FetchApiDataService {
  // Inject the HttpClient module to the constructor params
  // This will provide HttpClient to the entire class, making it available via this.http
  constructor(private http: HttpClient) {}
  // Making the api call for the user registration endpoint
  public userRegistration(userDetails: any): Observable<any> {
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

  public getUser(): any {
    const user: any = JSON.parse(localStorage.getItem('user') || '');
    return {
      user,
    };
  }

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

  public getUserFavoriteMovies(): any {
    const user: any = JSON.parse(localStorage.getItem('user') || '');
    return {
      user: user.UserFavoriteMovies,
    };
  }

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
