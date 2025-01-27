import { Component, OnInit, TemplateRef } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service'; // Service to interact with the API
import { MatSnackBar } from '@angular/material/snack-bar'; // Service to display brief notifications (Snackbars)
import { Router } from '@angular/router'; // Service to navigate between routes (pages)
import { MatCardModule } from '@angular/material/card'; // Material Card module for card UI elements
import { MatButtonModule } from '@angular/material/button'; // Material Button module
import { MatFormFieldModule } from '@angular/material/form-field'; // Material Form Field module for input fields
import { MatInputModule } from '@angular/material/input'; // Material Input module for text fields
import { MatIconModule } from '@angular/material/icon'; // Material Icon module for icons
import { MatDialog, MatDialogModule } from '@angular/material/dialog'; // Dialog module for opening modals
import { MatTabsModule } from '@angular/material/tabs'; // Material Tabs module for tabbed UI
import { CommonModule } from '@angular/common'; // Angular's CommonModule (required for *ngIf, *ngFor)
import { FormsModule } from '@angular/forms'; // Angular Forms module (required for ngModel)

@Component({
  selector: 'app-user-profile', // Defines the selector used to render this component
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
  standalone: true,
  imports: [
    MatCardModule,
    CommonModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatDialogModule,
    MatTabsModule,
    CommonModule,
    FormsModule,
  ],
})
export class UserProfileComponent implements OnInit {
  // Define the userData object that holds user details and favorite movies
  userData: any = {
    Username: '',
    UserEmail: '',
    UserBirthday: '',
    UserPassword: '',
    UserFavoriteMovies: [], // List of IDs for user's favorite movies
  };
  favoriteMovies: any[] = []; // Array to store the user's favorite movies
  showDescription: string = ''; // Variable to hold the current movie description
  showDirector: string = ''; // Variable to hold the current movie director's name

  constructor(
    public fetchApiData: FetchApiDataService,
    public router: Router,
    public snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {
    const userData = localStorage.getItem('user');
    this.userData = userData ? JSON.parse(userData) : this.userData;
  }

  // ngOnInit lifecycle hook: Called when the component is initialized
  ngOnInit(): void {
    try {
      // Attempt to fetch the user's favorite movies after component is initialized
      this.getFavMovies();
    } catch (error) {
      console.error('Error during component initialization:', error);
    }
  }

  // Function to get the list of movies the user has marked as favorites
  getFavMovies(): void {
    // Reload user data from localStorage to ensure it's updated

    const updatedUser: any = JSON.parse(localStorage.getItem('user') || '{}');
    this.userData = updatedUser; // Reload userData from localStorage

    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.favoriteMovies = resp.filter((movie: any) => {
        return this.userData.UserFavoriteMovies.includes(movie._id);
      });
    });
  }

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
        this.getFavMovies();
      },
      (error) => {
        this.snackBar.open('Failed to remove movie from favorites', 'OK', {
          duration: 2000,
        });
      }
    );
  }

  confirmDeleteAccount(): void {
    const user: any = JSON.parse(localStorage.getItem('user') as any);
    this.fetchApiData.deregisterUser(user.Username).subscribe((resp: any) => {
    });
    this.logout();
  }

  updateProfile(): void {
    this.fetchApiData.editUser(this.userData.Username, this.userData).subscribe(
      (resp: any) => {
        // On success, update user data and store it in localStorage

        this.userData = {
          ...resp,
          UserFavoriteMovies: this.userData.UserFavoriteMovies,
        };
        localStorage.setItem('user', JSON.stringify(this.userData));
        this.snackBar.open('User details updated successfully', 'OK', {
          duration: 2000,
        });
      },
      (error) => {
        this.snackBar.open(
          'Failed to update user details: ' + error.message,
          'OK',
          {
            duration: 2000,
          }
        );
      }
    );
  }

  allMovies(): void {
    this.router.navigate(['allMovies']);
  }
  // Function to log out the user by removing data from localStorage

  logout(): void {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    this.router.navigate(['welcome']);
    this.snackBar.open('Logged out successfully', 'OK', { duration: 2000 });
  }

  showDescriptionDialog(templateRef: TemplateRef<any>, desc: string): void {
    this.showDescription = desc;
    this.dialog.open(templateRef, {
      width: '400px',
    });
  }

  showDirectorDialog(templateRef: TemplateRef<any>, director: string): void {
    this.showDirector = director;
    this.dialog.open(templateRef, {
      width: '400px',
    });
  }
}
