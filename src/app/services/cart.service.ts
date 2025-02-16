import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface CartItem {
  productId: number;
  quantity: number;
}

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private baseUrl = 'https://legotech.koyeb.app';

  constructor(private http: HttpClient) {}

  addToCart(
    productId: number,
    quantity: number
  ): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(`${this.baseUrl}/cart/add`, {
      productId,
      quantity,
    });
  }

  getCart(userId: string): Observable<CartItem[]> {
    return this.http.get<CartItem[]>(`${this.baseUrl}/cart/${userId}`);
  }

  removeFromCart(
    userId: string,
    productId: number
  ): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(
      `${this.baseUrl}/cart/remove/${userId}/${productId}`
    );
  }

  clearCart(userId: string): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(
      `${this.baseUrl}/cart/clear/${userId}`
    );
  }

  finalizePurchase(userId: string): Observable<{ orderId: string }> {
    return this.http.post<{ orderId: string }>(
      `${this.baseUrl}/purchase/${userId}`,
      {}
    );
  }

  confirmPayment(
    orderId: string,
    paymentStatus: string
  ): Observable<{ success: boolean }> {
    return this.http.post<{ success: boolean }>(
      `${this.baseUrl}/purchase/confirm-payment/${orderId}`,
      {
        paymentStatus,
      }
    );
  }
}
