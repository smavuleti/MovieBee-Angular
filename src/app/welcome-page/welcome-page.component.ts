import { Component, OnInit } from '@angular/core';
import { UserRegistrationFormComponent } from '../user-registration-form/user-registration-form.component';
import { LoginFormComponent } from '../login-form/login-form.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss'],
  standalone: true,
})
export class WelcomePageComponent implements OnInit {
  constructor(public dialog: MatDialog) {}
  ngOnInit(): void {}

  // Function to open the User Registration dialog when the user clicks a button
  openUserRegistrationDialog(): void {
    // Open the UserRegistrationFormComponent in a dialog with a specific width
    this.dialog.open(UserRegistrationFormComponent, {
      width: '600px',
    });
  }

  // Function to open the User Login dialog when the user clicks a button
  openUserLoginDialog(): void {
    this.dialog.open(LoginFormComponent, {
      width: '600px',
    });
  }
}
