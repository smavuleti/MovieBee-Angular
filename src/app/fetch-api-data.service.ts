// src/app/fetch-api-data.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FetchApiDataService {
  // Base URL for your API
  private apiUrl = 'https://smavuleti-moviebee-479d2e8d7a6f.herokuapp.com';

  constructor(private http: HttpClient) {}

  // User Registration
  public userRegistration(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/users`, userData);
  }

  // User Login
  public userLogin(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, userData);
  }

  // Get All Movies
  public getAllMovies(): Observable<any> {
    return this.http.get(`${this.apiUrl}/allMovies`, this.getHeaders());
  }

  // Get One Movie
  public getMovie(movieTitle: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/allMovies/${movieTitle}`, this.getHeaders());
  }

  // Get Director
  public getDirector(directorName: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/directors/${directorName}`, this.getHeaders());
  }

  // Get Genre
  public getGenre(genreName: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/genres/${genreName}`, this.getHeaders());
  }

  // Get User
  public getUser(): Observable<any> {
    return this.http.get(`${this.apiUrl}/users`, this.getHeaders());
  }

  // Get Favourite Movies for a User
  public getFavouriteMovies(): Observable<any> {
    return this.http.get(`${this.apiUrl}/users/movies`, this.getHeaders());
  }

  // Add a Movie to Favourite Movies
  public addFavouriteMovie(username: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/users/${username}/favorites`, {}, this.getHeaders());
  }

    // Delete a Movie from Favourite Movies
    public removeFavouriteMovie(username: string): Observable<any> {
      return this.http.delete(`${this.apiUrl}/users/${username}/favorites`, this.getHeaders());
    }

  // Edit User
  public editUser(username: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/users/${username}`, this.getHeaders());
  }

  // Delete User
  public deleteUser(username: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/users/${username}`, this.getHeaders());
  }


  // Helper method to include headers (e.g., Authorization token)
  private getHeaders(): { headers: HttpHeaders } {
    const token = localStorage.getItem('token'); // Replace with your token storage mechanism
    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
      }),
    };
  }
}
