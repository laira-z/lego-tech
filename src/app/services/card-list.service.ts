import { Injectable } from '@angular/core';
type ProductProps = {
  title: String;
};
@Injectable({
  providedIn: 'root',
})
export class CardListService {
  constructor() {}

  getAllProducts(): Promise<any> {
    return fetch('https://legotech.koyeb.app/products').then((response) => {
      if (!response.ok) {
        throw new Error(`Erro: ${response.status}`);
      }
      return response.json();
    });
  }
}
