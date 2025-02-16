import { Component, OnInit } from '@angular/core';
import { PurchaseService } from '../../services/purchase.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-purchase',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './purchase.component.html',
  styleUrl: './purchase.component.css',
})
export class PurchasesComponent implements OnInit {
  purchases: any[] = [];

  constructor(private purchaseService: PurchaseService) {}

  ngOnInit() {
    this.loadPurchases();
  }

  loadPurchases() {
    this.purchaseService.getPurchases().subscribe(
      (data) => {
        this.purchases = data;
        this.purchases = this.purchases.map((data) => ({
          ...data,
          items: Array.isArray(data.items) ? data.items : [data.items],
        }));
      },
      (error) => console.error('Erro ao carregar compras', error)
    );
  }
}
