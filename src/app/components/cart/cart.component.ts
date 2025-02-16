import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];
  userId = '1'; // Substituir pelo ID do usuário autenticado

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.getCartItems();
  }

  getCartItems() {
    this.cartService.getCart(this.userId).subscribe((items) => {
      this.cartItems = items;
    });
  }

  removeItem(productId: number) {
    this.cartService.removeFromCart(this.userId, productId).subscribe(() => {
      this.getCartItems();
    });
  }

  clearCart() {
    this.cartService.clearCart(this.userId).subscribe(() => {
      this.cartItems = [];
    });
  }

  finalizePurchase() {
    this.cartService.finalizePurchase(this.userId).subscribe((response) => {
      console.log('Pedido finalizado! ID do pedido:', response.orderId);
      this.cartItems = [];
    });
  }
}
