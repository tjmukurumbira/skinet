import {v4 as uuid } from 'uuid';
export interface IBasketTotals {
 shipping: number;
 subtotal: number;
 total: number;

}

export interface IBasket {
    id: string;
    items: IBasketItem[];
  }

export interface IBasketItem {
    id: string;
    productName: string;
    price: number;
    quantity: number;
    pictureUrl: string;
    type: string;
    brand: string;
  }

export class Basket implements IBasket {
    id = uuid();
    items: IBasketItem[] =[];

}
