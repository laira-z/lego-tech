import { Injectable } from '@angular/core';
type ProductProps = {
  title: String;
};
@Injectable({
  providedIn: 'root',
})
export class CardListService {
  constructor() {}

  async getAllProducts(): Promise<ProductProps[] | null> {
    let data: String[];
    fetch('legotech.koyeb.app/products')
      .then((data) => data.json())
      .then((res) => {
        data = res;
        return data;
      });

    return null;
  }
}
