import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { RouterLink } from '@angular/router';
import { CartItemProps } from '../../types/CartItemProps';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent {
  cartItems: CartItemProps[] = [];

  constructor(private cartService: CartService) {
    this.loadCart();
  }

  // Carrega os itens do carrinho
  loadCart() {
    this.cartService.getCart().subscribe((items) => {
      this.cartItems = items;
    });
  }

  // Aumenta a quantidade de um item no carrinho
  increaseQuantity(item: any) {
    this.cartService
      .updateCartItemQuantity(item.productId, item.quantity + 1)
      .subscribe(() => {
        item.quantity += 1;
      });
  }

  // Diminui a quantidade de um item, removendo se chegar a 0
  decreaseQuantity(item: any) {
    if (item.quantity > 1) {
      this.cartService
        .updateCartItemQuantity(item.productId, item.quantity - 1)
        .subscribe(() => {
          item.quantity -= 1;
        });
    } else {
      this.removeFromCart(item);
    }
  }

  // Remove um item do carrinho
  removeFromCart(item: any) {
    this.cartService.removeFromCart(item.productId).subscribe(() => {
      this.cartItems = this.cartItems.filter(
        (i) => i.productId !== item.productId
      );
    });
  }

  // Retorna o preço total do carrinho
  getTotalPrice(): number {
    return this.cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  }

  // Finaliza a compra
  finalizePurchase() {
    this.cartService.finalizePurchase().subscribe(() => {
      this.cartItems = []; // Esvazia o carrinho após a compra
      alert('Compra finalizada com sucesso!');
    });
  }
  getItemTotal(item: any): number {
    return item.price * item.quantity;
  }
}
