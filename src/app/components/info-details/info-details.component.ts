import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CardListService } from '../../services/card-list.service';
import { CardItemComponent } from '../card-item/card-item.component';
import { ProductProps } from '../../types/ProductProps';

@Component({
  selector: 'app-info-details',
  standalone: true,
  imports: [CardItemComponent],
  templateUrl: './info-details.component.html',
  styleUrl: './info-details.component.css',
})
export class InfoDetailsComponent implements OnInit {
  testId!: number;
  product!: ProductProps;
  constructor(
    private router: ActivatedRoute,
    private service: CardListService
  ) {}

  ngOnInit(): void {
    this.router.params.subscribe((params) => {
      this.testId = Number(params['id']);
      console.log('Test ID:', this.testId);
      this.service.getInfoDetails(this.testId).subscribe((item) => {
        this.product = item;
        console.log(this.product);
      });
    });
  }
}
