import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly apiUrl = 'https://legotech.koyeb.app';

  constructor(private http: HttpClient) {}
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('authToken');
    if (!token) {
      console.warn('Nenhum token JWT encontrado!');
      return new HttpHeaders();
    }
    return new HttpHeaders({ Authorization: `Bearer ${token}` });
  }
  // Função para obter os dados do usuário
  getUserProfile(): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.get<any>(`${this.apiUrl}/user`, { headers });
  }

  // Função para atualizar os dados do usuário
  updateUserProfile(user: any): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.put<any>(`${this.apiUrl}/${user.id}`, user, { headers });
  }
}
