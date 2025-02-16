import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'https://legotech.koyeb.app';
  private tokenKey = 'authToken';

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('authToken');
    if (!token) {
      console.warn('Nenhum token JWT encontrado!');
      return new HttpHeaders();
    }
    return new HttpHeaders({ Authorization: `Bearer ${token}` });
  }

  private isAuthenticatedSubject = new BehaviorSubject<boolean>(
    this.hasToken()
  );
  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {}

  login(email: string, password: string): Observable<{ token: string }> {
    return this.http
      .post<{ token: string }>(`${this.apiUrl}/login`, { email, password })
      .pipe(
        tap((response) => {
          this.setToken(response.token);
          this.router.navigate(['/']);
        })
      );
  }

  signup(
    name: string,
    email: string,
    password: string,
    address: string
  ): Observable<{ token: string }> {
    return this.http
      .post<{ token: string }>(`${this.apiUrl}/signup`, {
        name,
        email,
        password,
        address,
      })
      .pipe(
        tap((response) => {
          this.setToken(response.token);
          this.router.navigate(['/']);
        })
      );
  }
  getCartQuantity(): Observable<{ quantity: number }> {
    const headers = this.getAuthHeaders();
    return this.http.get<{ quantity: number }>(`${this.apiUrl}/cart/quantity`, {
      headers,
    });
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    this.isAuthenticatedSubject.next(false);
    this.router.navigate(['/login']); // Redireciona para login após logout
  }

  private setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
    this.isAuthenticatedSubject.next(true);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  private hasToken(): boolean {
    return !!this.getToken();
  }
}
