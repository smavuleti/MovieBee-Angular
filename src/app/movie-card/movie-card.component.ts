import { Component, OnInit, TemplateRef } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service'; // Service for interacting with API data
import { MatCardModule } from '@angular/material/card'; // Angular Material Card module for displaying cards
import { MatDialog } from '@angular/material/dialog'; // Angular Material Dialog module for showing modal dialogs
import { MatSnackBar } from '@angular/material/snack-bar'; // Angular Material Snackbar for displaying brief messages
import { CommonModule } from '@angular/common'; // Angular's CommonModule (necessary for using ngIf, ngFor, etc.)
import { MatIconModule } from '@angular/material/icon'; // Angular Material Icon module
import { MatDialogModule } from '@angular/material/dialog'; // Dialog module for Material design popups
import { MatButtonModule } from '@angular/material/button'; // Material Button module for UI buttons
import { Router } from '@angular/router'; // Angular Router for navigation between pages

/**
 * Component to display a list of movies as cards in the MovieBee application.
 *
 * This component fetches and displays movies, provides options to manage favorite movies,
 * and includes features for showing movie details and managing user navigation.
 */
@Component({
  selector: 'app-movie-card', // Defines the selector for this component, used in HTML to render the component
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
  standalone: true, // Marks this component as a standalone component
  imports: [
    MatCardModule,
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
  ],
})
export class MovieCardComponent implements OnInit {
  /**
   * Stores the list of movies retrieved from the API.
   * @type {any[]}
   */
  movies: any[] = [];
  /**
   * Stores the description of the currently selected movie for dialogs.
   * @type {string}
   */
  currentDescription: string = '';
  /**
   * Stores the director information of the currently selected movie for dialogs.
   * @type {string}
   */
  currentDirector: string = '';

  /**
   * Constructor to inject dependencies and initialize the component.
   *
   * @param fetchApiData - Service to fetch movies and manage API interactions
   * @param dialog - Service to handle Material dialogs
   * @param router - Router service for navigation
   * @param snackBar - Service to show notifications via snack bars
   */
  constructor(
    public fetchApiData: FetchApiDataService, // Service for fetching API data
    public dialog: MatDialog, // Service for opening Material dialogs
    public router: Router, // Service for routing between views/pages
    private snackBar: MatSnackBar // Service for showing SnackBars
  ) {}

  /**
   * Lifecycle hook that runs when the component is initialized.
   * Fetches the list of movies from the API.
   */
  ngOnInit(): void {
    this.getMovies(); // Fetch the list of movies when the component initializes
  }

  /**
   * Fetches the list of movies from the API and assigns them to the `movies` property.
   */
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((data: any) => {
      this.movies = data;
      return this.movies;
    });
  }

  /**
   * Displays the movie's description in a dialog.
   *
   * @param templateRef - The template reference for the dialog content
   * @param description - The description of the movie to display
   */
  showDescriptionDialog(
    templateRef: TemplateRef<any>,
    description: string
  ): void {
    this.currentDescription = description;
    this.dialog.open(templateRef, { width: '400px' });
  }

  /**
   * Displays the director information of the movie in a dialog.
   *
   * @param templateRef - The template reference for the dialog content
   * @param director - The name of the director to display
   */
  showDirectorDialog(templateRef: TemplateRef<any>, director: string): void {
    this.currentDirector = director;
    this.dialog.open(templateRef, { width: '400px' });
  }

  /**
   * Adds a movie to the user's list of favorite movies.
   *
   * @param movieId - The ID of the movie to add to favorites
   */
  addToFavorites(movieId: string): void {
    const user: any = JSON.parse(localStorage.getItem('user') as any);
    this.fetchApiData.addFavoriteMovie(user.Username, movieId).subscribe(
      (data: any) => {
        // Update user data
        user.UserFavoriteMovies.push(movieId);
        localStorage.setItem('user', JSON.stringify(user)); // Update localStorage

        this.snackBar.open('Movie added to favorites', 'OK', {
          duration: 2000,
        });

        // Trigger a refresh of the movie list or any other related data
        this.getMovies();
      },
      (error) => {
        this.snackBar.open('Failed to add movie to favorites', 'OK', {
          duration: 2000,
        });
      }
    );
  }

  /**
   * Removes a movie from the user's list of favorite movies.
   *
   * @param movieId - The ID of the movie to remove from favorites
   */
  removeFromFavorites(movieId: string): void {
    const user: any = JSON.parse(localStorage.getItem('user') as any);
    this.fetchApiData.removeFavoriteMovie(user.Username, movieId).subscribe(
      (data: any) => {
        // Update user data
        user.UserFavoriteMovies = user.UserFavoriteMovies.filter(
          (id: string) => id !== movieId
        );
        localStorage.setItem('user', JSON.stringify(user)); // Update localStorage

        this.snackBar.open('Movie removed from favorites', 'OK', {
          duration: 2000,
        });

        // Trigger a refresh of the movie list or any other related data
        this.getMovies();
      },
      (error) => {
        this.snackBar.open('Failed to remove movie from favorites', 'OK', {
          duration: 2000,
        });
      }
    );
  }

  /**
   * Checks if a movie is in the user's list of favorite movies.
   *
   * @param movieId - The ID of the movie to check
   * @returns {boolean} - `true` if the movie is in the favorites, otherwise `false`
   */
  isFavorite(movieId: string): boolean {
    const userFavorites: any = JSON.parse(
      localStorage.getItem('user') as any
    ).UserFavoriteMovies;
    return userFavorites.includes(movieId);
  }

  /**
   * Navigates the user to the profile page.
   */
  viewProfile(): void {
    this.router.navigate(['profile']);
  }

  /**
   * Logs out the user, clearing their data from local storage and navigating to the welcome page.
   */
  logout(): void {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    this.router.navigate(['welcome']);
  }
}
