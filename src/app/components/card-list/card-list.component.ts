import { Component, Input } from '@angular/core';
import { CardItemComponent } from '../card-item/card-item.component';
import { CardListService } from '../../services/card-list.service';
import { ProductProps } from '../../types/ProductProps';

@Component({
  selector: 'app-card-list',
  standalone: true,
  imports: [CardItemComponent],
  templateUrl: './card-list.component.html',
  styleUrl: './card-list.component.css',
})
export class CardListComponent {
  @Input() list!: ProductProps[];

  constructor(private service: CardListService) {
    this.onInit();
  }
  onInit() {
    this.service.getAllProducts().then((res) => {
      if (res) {
        res.map((item) => this.list.push(item));
      }
    });
    console.log('logou');
  }
}
