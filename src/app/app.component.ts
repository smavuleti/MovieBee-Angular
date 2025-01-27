import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

/**
 * Root component of the MovieBee Angular client application.
 *
 * This component serves as the entry point for the application,
 * containing the router-outlet for navigating between different views.
 */
@Component({
  selector: 'app-root', // The component's CSS element selector
  templateUrl: './app.component.html', // The HTML template for this component
  styleUrls: ['./app.component.scss'], // The styles for this component
  standalone: true, // Indicates that this is a standalone component
  imports: [
    RouterModule, // Import RouterModule to enable routing via router-outlet
  ],
})
export class AppComponent {
  /**
   * The title of the application, displayed in the browser tab or header.
   * @type {string}
   */
  title = 'MovieBee-Angular-client';
}
