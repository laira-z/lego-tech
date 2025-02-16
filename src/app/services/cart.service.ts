import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CartItemProps } from '../types/CartItemProps';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private readonly baseUrl = 'https://legotech.koyeb.app';

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('authToken');
    if (!token) {
      console.warn('⚠️ Nenhum token JWT encontrado!');
      return new HttpHeaders();
    }

    return new HttpHeaders({ Authorization: `Bearer ${token}` });
  }

  addToCart(
    productId: number,
    quantity: number
  ): Observable<{ message: string }> {
    const headers = this.getAuthHeaders();
    return this.http.post<{ message: string }>(
      `${this.baseUrl}/cart/add`,
      { productId, quantity },
      { headers }
    );
  }

  getCart(): Observable<CartItemProps[]> {
    const headers = this.getAuthHeaders();
    return this.http.get<CartItemProps[]>(`${this.baseUrl}/cart`, { headers });
  }

  removeFromCart(productId: number): Observable<{ message: string }> {
    const headers = this.getAuthHeaders();
    return this.http.delete<{ message: string }>(
      `${this.baseUrl}/cart/remove/${productId}`,
      { headers }
    );
  }

  clearCart(): Observable<{ message: string }> {
    const headers = this.getAuthHeaders();
    return this.http.delete<{ message: string }>(`${this.baseUrl}/cart/clear`, {
      headers,
    });
  }

  updateCartItemQuantity(
    productId: number,
    quantity: number
  ): Observable<{ message: string }> {
    const headers = this.getAuthHeaders();
    return this.http.put<{ message: string }>(
      `${this.baseUrl}/cart/update`,
      { productId, quantity },
      { headers }
    );
  }

  finalizePurchase(): Observable<{ orderId: string }> {
    const headers = this.getAuthHeaders();
    return this.http.post<{ orderId: string }>(
      `${this.baseUrl}/cart/checkout`,
      {},
      { headers }
    );
  }

  confirmPayment(
    orderId: string,
    paymentStatus: string
  ): Observable<{ success: boolean }> {
    const headers = this.getAuthHeaders();
    return this.http.post<{ success: boolean }>(
      `${this.baseUrl}/purchase/confirm-payment/${orderId}`,
      { paymentStatus },
      { headers }
    );
  }

  getCartTotal(cartItems: CartItemProps[]): number {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  }
}
