import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatCardModule } from '@angular/material/card';  // Import MatCardModule
import { MatDialogModule } from '@angular/material/dialog';  // Import MatDialogModule
import { CommonModule } from '@angular/common';  // Import CommonModule for ngFor





@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
  standalone: true,
  imports: [
    MatCardModule,
    MatDialogModule,
    CommonModule
  ],
    
})
export class MovieCardComponent  implements OnInit{
  movies: any[] = [];
  constructor(public fetchApiData: FetchApiDataService) { }

ngOnInit(): void {
  this.getMovies();
}

getMovies(): void {
  this.fetchApiData.getAllMovies().subscribe((movies: any) => {
      this.movies = movies;
      console.log('Movies fetched:', this.movies);
      //return this.movies;
    });
  }
}