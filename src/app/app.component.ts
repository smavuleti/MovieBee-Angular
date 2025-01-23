import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserRegistrationFormComponent } from './user-registration-form/user-registration-form.component';
import { LoginFormComponent } from './login-form/login-form.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'MovieBee-Angular-client';

  constructor(public dialog: MatDialog) {}

  // This function will open the dialog when the login button is clicked
  openUserRegistrationDialog(): void {
    console.log('Opening user registration dialog...');
    this.dialog.open(UserRegistrationFormComponent, {
      width: '500px', // Set dialog width as needed
    });
  }

  openUserLoginDialog(): void {
    console.log('Opening user login dialog...');
    this.dialog.open(LoginFormComponent, {
      width: '500px', // Set dialog width as needed
    });
  }
}
