import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service'; // Assuming you have this service to handle API requests

/**
 * Component for user registration form.
 * This component provides a form for users to register a new account.
 */
@Component({
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.scss'],
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
  ],
})
export class UserRegistrationFormComponent implements OnInit {
    /**
   * Stores user registration data, including username, password, email, and birthday.
   */
  movie = { Username: '', Password: '', Email: '', Birthday: '' };

    /**
   * Constructs the UserRegistrationFormComponent and injects required dependencies.
   * @param fetchApiData - Service for making API requests.
   * @param snackBar - Angular Material SnackBar for displaying notifications.
   * @param dialogRef - Reference to the current dialog instance.
   */
  constructor(
    private fetchApiData: FetchApiDataService,
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>
  ) {}

    /**
   * Handles user registration by submitting form data to the API.
   * On success, the dialog is closed and a success message is shown.
   * On failure, an error message is displayed.
   */
  registerUser(): void {
    this.fetchApiData.userRegistration(this.movie).subscribe(
      (result) => {
        this.dialogRef.close(); // Close the modal on success
        this.snackBar.open('Registration successful!', 'OK', {
          duration: 2000,
        });
        alert('Signup successful! You can now log in to your account.');
      },
      (error) => {
        this.snackBar.open('Registration failed: ' + error.message, 'OK', {
          duration: 2000,
        });
      }
    );
  }

    /**
   * Lifecycle hook that is called after the component has been initialized.
   */
  ngOnInit(): void {}
}
