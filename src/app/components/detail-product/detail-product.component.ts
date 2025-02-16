import { Component, ElementRef, Input, signal, ViewChild } from '@angular/core';
import { ProductProps } from '../../types/ProductProps';
import {
  CommonModule,
  CurrencyPipe,
  NgOptimizedImage,
  TitleCasePipe,
} from '@angular/common';
import { CartService } from '../../services/cart.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-detail-product',
  standalone: true,
  imports: [NgOptimizedImage, CurrencyPipe, TitleCasePipe, CommonModule],
  templateUrl: './detail-product.component.html',
  styleUrls: ['./detail-product.component.css'],
})
export class DetailProductComponent {
  toastMessage = signal('');
  @ViewChild('toastContainer') toastContainer!: ElementRef;
  @Input() product!: ProductProps;

  constructor(
    private cartService: CartService,
    private authService: AuthService,
    private router: Router
  ) {}

  addToCart(product: ProductProps): void {
    const quantity = 1;

    this.cartService.addToCart(product.id, quantity).subscribe({
      next: (response) => {
        console.log('Produto adicionado ao carrinho:', response.message);
        ('Item adicionado ao carrinho:');
        this.toastMessage.set('Item adicionado ao carrinho!');

        this.showToast();
      },
      error: (error) => {
        console.error('Erro ao adicionar ao carrinho:', error);
        this.isLogged();
      },
    });
  }

  showToast() {
    if (this.toastContainer) {
      this.toastContainer.nativeElement.classList.add('show');
      setTimeout(() => {
        this.toastMessage.set('');
      }, 3000);
    }
  }
  isLogged() {
    this.authService.isAuthenticated$.subscribe((authStatus) => {
      if (!authStatus) {
        this.router.navigate(['/login']);
      }
    });
  }
}
