import { Component, OnInit } from '@angular/core';
import { UserRegistrationFormComponent } from '../user-registration-form/user-registration-form.component';
import { LoginFormComponent } from '../login-form/login-form.component';
import { MatDialog } from '@angular/material/dialog';

/**
 * Component for the Welcome Page.
 * This is the entry point of the application where users can choose to register or log in.
 */
@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss'],
  standalone: true,
})
export class WelcomePageComponent implements OnInit {
  /**
   * Constructs the WelcomePageComponent and injects the MatDialog service.
   * @param dialog - Angular Material Dialog service for opening dialogs.
   */
  constructor(public dialog: MatDialog) {}
  /**
   * Lifecycle hook that is called after the component has been initialized.
   */
  ngOnInit(): void {}

  /**
   * Opens the User Registration dialog.
   * This function is triggered when the user clicks the "Register" button.
   * It opens the `UserRegistrationFormComponent` in a dialog with a width of 600px.
   */
  openUserRegistrationDialog(): void {
    this.dialog.open(UserRegistrationFormComponent, {
      width: '600px',
    });
  }

  /**
   * Opens the User Login dialog.
   * This function is triggered when the user clicks the "Login" button.
   * It opens the `LoginFormComponent` in a dialog with a width of 600px.
   */
  openUserLoginDialog(): void {
    this.dialog.open(LoginFormComponent, {
      width: '600px',
    });
  }
}
