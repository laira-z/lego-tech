import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CardListService } from '../../services/card-list.service';
import { CardItemComponent } from '../card-item/card-item.component';
import { ProductProps } from '../../types/ProductProps';
import { DetailProductComponent } from '../detail-product/detail-product.component';

@Component({
  selector: 'app-info-details',
  standalone: true,
  imports: [DetailProductComponent],
  templateUrl: './info-details.component.html',
  styleUrl: './info-details.component.css',
})
export class InfoDetailsComponent implements OnInit {
  id!: number;
  product!: ProductProps;
  constructor(
    private router: ActivatedRoute,
    private service: CardListService
  ) {}

  ngOnInit(): void {
    this.router.params.subscribe((params) => {
      this.id = Number(params['id']);
      this.service.getInfoDetails(this.id).subscribe((item) => {
        this.product = item;
      });
    });
  }
}
