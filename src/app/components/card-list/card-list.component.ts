import { Component, Input, OnInit } from '@angular/core';
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
export class CardListComponent implements OnInit {
  @Input() list!: ProductProps[];

  constructor(private service: CardListService) {}
  ngOnInit(): void {
    this.service.getAllProducts().then((res) => {
      console.log(res);

      if (res) {
        this.list = res;
        console.log(res);
      }
    });
  }
}
