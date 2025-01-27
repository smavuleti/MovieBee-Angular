import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon'; // Import MatIconModule
import { MatTabsModule } from '@angular/material/tabs';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms'; // Import ReactiveFormsModule
import { AppComponent } from './app.component'; // Standalone component
import { UserRegistrationFormComponent } from './user-registration-form/user-registration-form.component'; // Standalone component
import { LoginFormComponent } from './login-form/login-form.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MovieCardComponent } from './movie-card/movie-card.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { UserProfileComponent } from './user-profile/user-profile.component';

/**
 * Defines the application's routes.
 * - `welcome`: Loads the WelcomePageComponent lazily.
 * - `allMovies`: Loads the MovieCardComponent lazily.
 * - `profile`: Loads the UserProfileComponent lazily.
 * - Default: Redirects to the `welcome` route.
 */
const appRoutes: Routes = [
  {
    path: 'welcome',
    loadComponent: () =>
      import('./welcome-page/welcome-page.component').then(
        (m) => m.WelcomePageComponent
      ),
  },
  {
    path: 'allMovies',
    loadComponent: () =>
      import('./movie-card/movie-card.component').then(
        (m) => m.MovieCardComponent
      ),
  },
  {
    path: 'profile',
    loadComponent: () =>
      import('./user-profile/user-profile.component').then(
        (m) => m.UserProfileComponent
      ),
  },
  { path: '', redirectTo: 'welcome', pathMatch: 'prefix' },
];

/**
 * The main application module.
 * This module sets up the Angular application by importing required modules,
 * declaring components, and defining routes.
 */
@NgModule({
   /**
   * Modules to import for this application.
   */
  imports: [
    BrowserModule, // Provides browser-specific services like DOM rendering
    AppRoutingModule, // Sets up application-level routing
    HttpClientModule, // Enables HTTP communication with APIs
    MatInputModule, // Material Input component
    MatButtonModule, // Material Button component
    MatCardModule, // Material Card component
    MatFormFieldModule, // Material Form Field component
    MatDialogModule, // Material Dialog component
    MatSnackBarModule, // Material Snackbar for notifications
    FormsModule, // Template-driven forms module
    MatTabsModule, // Material Tabs component
    ReactiveFormsModule, // Reactive forms module for form handling
    BrowserAnimationsModule, // Supports animations for Angular Material
    AppComponent, // Root component of the application
    UserRegistrationFormComponent, // Component for user registration form
    LoginFormComponent, // Component for user login form
    MovieCardComponent, // Component displaying movie cards
    WelcomePageComponent, // Component for the welcome page
    UserProfileComponent, // Component for the user profile page
    RouterModule.forRoot(appRoutes),  // Configures application routes
    MatIconModule, // Material Icon component
  ],
  /**
   * Services available application-wide.
   */
  providers: [],
   /**
   * The main application component to bootstrap.
   */
  bootstrap: [AppComponent],
})
export class AppModule {}
