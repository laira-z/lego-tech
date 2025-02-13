import { Component, Input } from '@angular/core';
import { ProductProps } from '../../types/ProductProps';
import {
  CommonModule,
  CurrencyPipe,
  NgOptimizedImage,
  TitleCasePipe,
} from '@angular/common';

@Component({
  selector: 'app-card-item',
  standalone: true,
  imports: [NgOptimizedImage, CurrencyPipe, TitleCasePipe, CommonModule],
  templateUrl: './card-item.component.html',
  styleUrl: './card-item.component.css',
})
export class CardItemComponent {
  @Input() item!: ProductProps;
}
