import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms'; // Import ReactiveFormsModule
import { CommonModule } from '@angular/common'; // Import CommonModule

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule, 
    CommonModule, //  CommonModule to use directives like NgIf
  ],
})
export class LoginFormComponent implements OnInit {
  loginForm: FormGroup; // Form group to handle login form fields

  constructor(
    private fb: FormBuilder, // Inject FormBuilder to build form
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<LoginFormComponent>, // Inject dialog reference to close dialog
    public snackBar: MatSnackBar // Inject snackbar to show notifications
  ) {
    // Initialize loginForm with FormBuilder
    this.loginForm = this.fb.group({
      Username: ['', Validators.required],
      Password: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    // Any logic needed during component initialization
  }

  loginUser(): void {
    if (this.loginForm.valid) {
      this.fetchApiData.userLogin(this.loginForm.value).subscribe(
        (result) => {
          // Save user info and token to localStorage
          localStorage.setItem('user', JSON.stringify(result.user));
          localStorage.setItem('token', result.token);

          // Close the dialog and show success message
          this.dialogRef.close();
          this.snackBar.open(
            `Login Successful, Hello ${result.user.Username}!`,
            'OK',
            {
              duration: 2000,
              panelClass: ['success-snackbar'], // Optional success styling
            }
          );

          // Display alert for additional confirmation
          alert('Login successful! Welcome to your dashboard.');
        },
        (error) => {
          // Handle login failure and show error message
          console.error('Login Error:', error); // Log error for debugging
          this.snackBar.open(
            error.message || 'Login failed. Please try again.',
            'Retry',
            {
              duration: 3000,
              panelClass: ['error-snackbar'], // Optional error styling
            }
          );
        }
      );
    } else {
      // Handle case when form is invalid
      this.snackBar.open('Please fill out all required fields.', 'OK', {
        duration: 2000,
        panelClass: ['error-snackbar'], // Optional error styling
      });
    }
  }
}
