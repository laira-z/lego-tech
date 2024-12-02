import { Component, Input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-card-item',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './card-item.component.html',
  styleUrl: './card-item.component.css',
})
export class CardItemComponent {
  @Input() title!: string;

  router = new Router();

  goDetails() {
    this.router.navigate(['/details']);
  }
}
