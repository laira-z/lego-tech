import { Component, Input } from '@angular/core';
import { ProductProps } from '../../types/ProductProps';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-detail-product',
  standalone: true,
  imports: [NgOptimizedImage],
  templateUrl: './detail-product.component.html',
  styleUrl: './detail-product.component.css',
})
export class DetailProductComponent {
  @Input() product!: ProductProps;
}
