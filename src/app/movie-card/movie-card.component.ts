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
  // Properties to store the list of movies, current movie description and director
  movies: any[] = [];
  currentDescription: string = '';
  currentDirector: string = '';

  constructor(
    public fetchApiData: FetchApiDataService, // Service for fetching API data
    public dialog: MatDialog, // Service for opening Material dialogs
    public router: Router, // Service for routing between views/pages
    private snackBar: MatSnackBar // Service for showing SnackBars
  ) {}

  // ngOnInit lifecycle hook: Runs when the component is initialized
  ngOnInit(): void {
    this.getMovies(); // Fetch the list of movies when the component initializes
  }

  // Function to fetch all movies from the API service
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((data: any) => {
      this.movies = data;
      console.log(this.movies);
      return this.movies;
    });
  }

  // Function to show the movie's description in a dialog box
  showDescriptionDialog(
    templateRef: TemplateRef<any>,
    description: string
  ): void {
    this.currentDescription = description;
    this.dialog.open(templateRef, { width: '400px' });
  }

  // Function to show the movie's director information in a dialog box
  showDirectorDialog(templateRef: TemplateRef<any>, director: string): void {
    this.currentDirector = director;
    this.dialog.open(templateRef, { width: '400px' });
  }

  // Function to add a movie to the user's list of favorite movies
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

  // Function to remove a movie from the user's list of favorite movies
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

  // Function to check if a movie is in the user's list of favorite movies
  isFavorite(movieId: string): boolean {
    const userFavorites: any = JSON.parse(
      localStorage.getItem('user') as any
    ).UserFavoriteMovies;
    console.log(userFavorites);
    return userFavorites.includes(movieId);
  }

  // Function to navigate to the user's profile page
  viewProfile(): void {
    this.router.navigate(['profile']);
  }

  // Function to log out the user
  logout(): void {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    this.router.navigate(['welcome']);
  }
}
