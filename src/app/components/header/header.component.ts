import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CartService } from '../../services/cart.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  isAuthenticated = false;
  qntCart = 0;

  constructor(
    private authService: AuthService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.authService.isAuthenticated$.subscribe((authStatus) => {
      this.isAuthenticated = authStatus;
      if (authStatus) {
        this.updateCartQuantity();
      }
    });

    // Inscreva-se no cartQuantity$ para atualizar a quantidade do carrinho dinamicamente
    this.cartService.cartQuantity$.subscribe((quantity) => {
      this.qntCart = quantity;
    });
  }

  updateCartQuantity(): void {
    this.cartService.getCartQuantity().subscribe((quantity) => {
      this.qntCart = quantity;
    });
  }

  logout(): void {
    this.authService.logout();
  }
}
