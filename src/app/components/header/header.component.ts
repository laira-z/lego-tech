import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  qntCart: number = 0;
  isAuthenticated: boolean = false;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.isAuthenticated$.subscribe((isAuthenticated) => {
      this.isAuthenticated = isAuthenticated;
      if (isAuthenticated) {
        this.loadCartQuantity();
      }
    });
  }
  logout(): void {
    this.authService.logout();
  }
  loadCartQuantity(): void {
    this.authService.getCartQuantity().subscribe({
      next: (response) => {
        this.qntCart = response.quantity;
      },
      error: (err) => {
        console.error('Erro ao carregar quantidade do carrinho', err);
      },
    });
  }
}
