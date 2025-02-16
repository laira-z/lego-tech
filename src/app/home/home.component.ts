import { Component } from '@angular/core';
import { CardListComponent } from '../components/card-list/card-list.component';
import { CarouselComponent } from '../components/carousel/carousel.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CardListComponent, CarouselComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {}
