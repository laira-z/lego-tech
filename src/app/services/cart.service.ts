import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject, map } from 'rxjs';
import { CartItemProps } from '../types/CartItemProps';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private readonly baseUrl = 'https://legotech.koyeb.app';
  private cartQuantitySubject: BehaviorSubject<number> =
    new BehaviorSubject<number>(0); // Observable para a quantidade de itens no carrinho
  cartQuantity$ = this.cartQuantitySubject.asObservable(); // Observable que pode ser subscrito

  constructor(private http: HttpClient, private authService: AuthService) {
    authService.isAuthenticated$.subscribe((authStatus) => {
      if (authStatus) {
        this.loadCart();
      }
    });
  }

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('authToken');
    if (!token) {
      console.warn('Nenhum token JWT encontrado!');
      return new HttpHeaders();
    }
    return new HttpHeaders({ Authorization: `Bearer ${token}` });
  }

  addToCart(
    productId: number,
    quantity: number
  ): Observable<{ message: string }> {
    const headers = this.getAuthHeaders();
    // Atualiza a quantidade localmente
    const currentQuantity = this.cartQuantitySubject.value;
    this.cartQuantitySubject.next(currentQuantity + quantity); // Atualiza o valor no BehaviorSubject

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

  // Método para obter o total do carrinho
  getCartTotal(cartItems: CartItemProps[]): number {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  }

  getCartQuantity(): Observable<number> {
    return this.getCart().pipe(
      map((cartItems: any[]) =>
        cartItems.reduce((total, item) => total + item.quantity, 0)
      )
    );
  }

  private loadCart(): void {
    this.getCart().subscribe((cartItems) => {
      const totalQuantity = cartItems.reduce(
        (sum, item) => sum + item.quantity,
        0
      );
      this.cartQuantitySubject.next(totalQuantity);
    });
  }
}
