import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProductProps } from '../types/ProductProps';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CardListService {
  constructor(private http: HttpClient) {}

  getAllProducts(): Promise<ProductProps[]> {
    return fetch('https://legotech.koyeb.app/products').then((response) => {
      if (!response.ok) {
        throw new Error(`Erro: ${response.status}`);
      }
      return response.json();
    });
  }

  getInfoDetails(id: number): Observable<ProductProps> {
    return this.http.get<ProductProps>(
      'https://legotech.koyeb.app/products/info/' + id
    );
  }
}
