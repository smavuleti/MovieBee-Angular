import { Component, ElementRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserRegistrationFormComponent } from './user-registration-form/user-registration-form.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { MovieCardComponent } from './movie-card/movie-card.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'MovieBee-Angular-client';

  constructor(public dialog: MatDialog, private el: ElementRef) {}

  // Open User Registration Dialog
  openUserRegistrationDialog(): void {
    const mainContent = this.el.nativeElement.querySelector('.main-page');
    if (mainContent) {
      mainContent.setAttribute('aria-hidden', 'true');
    }

    const dialogRef = this.dialog.open(UserRegistrationFormComponent, {
      width: '500px',
    });

    dialogRef.afterClosed().subscribe(() => {
      if (mainContent) {
        mainContent.removeAttribute('aria-hidden');
      }
    });
  }

  // Open User Login Dialog
  openUserLoginDialog(): void {
    const mainContent = this.el.nativeElement.querySelector('.main-page');
    if (mainContent) {
      mainContent.setAttribute('aria-hidden', 'true');
    }

    const dialogRef = this.dialog.open(LoginFormComponent, {
      width: '500px',
    });

    dialogRef.afterClosed().subscribe(() => {
      if (mainContent) {
        mainContent.removeAttribute('aria-hidden');
      }
    });
  }

   // Open Movie Card Dialog
   openMovieCardDialog(): void {
    this.dialog.open(MovieCardComponent, {
      width: '50%',
      height: '50%',
    });
  }
}
