import { Component } from '@angular/core';
import { CardListComponent } from '../components/card-list/card-list.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CardListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  list = [
    'test1',
    'test2',
    'test3',
    'test4',
    'test1',
    'test2',
    'test3',
    'test4',
    'test1',
    'test2',
    'test3',
    'test4',
  ];
}
