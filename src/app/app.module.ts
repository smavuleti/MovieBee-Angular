import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms'; // Import ReactiveFormsModule
import { AppComponent } from './app.component'; // Standalone component
import { UserRegistrationFormComponent } from './user-registration-form/user-registration-form.component'; // Standalone component
import { LoginFormComponent } from './login-form/login-form.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MovieCardComponent } from './movie-card/movie-card.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component'; // Added to support Angular Material animations

@NgModule({
  declarations: [
    // No need to declare standalone components in declarations
  
    
  
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatDialogModule,
    MatSnackBarModule,
    FormsModule,
    ReactiveFormsModule, // Add ReactiveFormsModule here
    BrowserAnimationsModule, // Ensure animations are supported
    AppComponent, // Import standalone AppComponent
    UserRegistrationFormComponent, // Import standalone UserRegistrationFormComponent
    LoginFormComponent, // Import standalone LoginFormComponent
    MovieCardComponent,
    WelcomePageComponent
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
