import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, catchError } from 'rxjs';
import { map } from 'rxjs/operators';

//Declaring the api url that will provide data for the client app
const apiUrl = 'https://smavuleti-moviebee-479d2e8d7a6f.herokuapp.com/';
@Injectable({
  providedIn: 'root'
})
export class FetchApiDataService {
  // Inject the HttpClient module to the constructor params
 // This will provide HttpClient to the entire class, making it available via this.http
  constructor(private http: HttpClient) {
  }
 // Making the api call for the user registration endpoint
  public userRegistration(userDetails: any): Observable<any> {
    const formattedDetails = {
      
      Username: userDetails.Username,
      UserPassword: userDetails.Password,
      UserEmail: userDetails.Email,
      UserBirthday: new Date(userDetails.Birthday).toISOString(),
    };
    console.log('Formatted User Details:', formattedDetails);
    return this.http.post(apiUrl + 'users', formattedDetails).pipe(
    catchError(this.handleError)
    
    );
  }

  public userLogin(userDetails: any): Observable<any> {
    // Format the user details to match the backend's expected structure
    const formattedDetails = {
      Username: userDetails.Username, // Map Email from userDetails
      UserPassword: userDetails.Password, // Map Password from userDetails
    };
  
    console.log('Formatted User Login Details:', formattedDetails);
  
    return this.http.post(apiUrl + 'login', formattedDetails).pipe(
      catchError(this.handleError)
    );
  }

  public getUser(): any {
    const user: any = JSON.parse(localStorage.getItem('user')|| "");
    return {
      user
    }
  }

  public editUser(username: String, userDetails: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.put(apiUrl + 'users/' + username, userDetails,  {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  public deleteUser(username: String): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.delete(apiUrl + 'users/' + username ,  {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  

  public getUserFavoriteMovies(): any {
    const user: any = JSON.parse(localStorage.getItem('user')|| "");
    return {
      user: user.FavoriteMovies
    }
  }

  public addFavoriteMovie(username: String, movieTitle: String): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.post(apiUrl + 'users/' + username + '/' + movieTitle, {},{headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  public deleteFavoriteMovie(username: String, movieTitle: String): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.delete(apiUrl + 'users/' + username + '/' + movieTitle,{headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  public getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'allMovies', {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  public getMovie(movietitle: String): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies/' + movietitle, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  public getMovieDirector(movieDirector: String): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies/director/' + movieDirector, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  public getMovieGenre(movieGenre: String): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies/genre/' + movieGenre, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }



private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
    console.error('Some error occurred:', error.error.message);
    } else {
    console.error(
        `Error Status code ${error.status}, ` +
        `Error body is: ${error.error}`);
    }
    return throwError(
    'Something bad happened; please try again later.');
  }
  private extractResponseData(res: any): any {
    const body = res;
    return body || { };
  }
}