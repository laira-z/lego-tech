import { Component, Input } from '@angular/core';
import { ProductProps } from '../../types/ProductProps';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-card-item',
  standalone: true,
  imports: [NgOptimizedImage],
  templateUrl: './card-item.component.html',
  styleUrl: './card-item.component.css',
})
export class CardItemComponent {
  @Input() item!: ProductProps;
}
