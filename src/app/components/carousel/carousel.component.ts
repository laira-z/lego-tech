import { CommonModule } from '@angular/common';
import { Component, effect, signal } from '@angular/core';

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.css',
})
export class CarouselComponent {
  images = signal([
    '/assets/png/slide1.png',
    '/assets/png/slide2.png',
    '/assets/png/slide3.png',
  ]);

  currentIndex = signal(0);

  constructor() {
    effect(() => {
      setInterval(() => {
        this.currentIndex.set((this.currentIndex() + 1) % this.images().length);
      }, 1000 * 15);
    });
  }
}
