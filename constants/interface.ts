import { OrderStatus } from './enum';

export interface ICategory {
  id?: number;
  name: string;
}
export interface IUser {
  id: string;
  name: string;
  email: string;
  avatar: string;
}

export interface IStore {
  id?: number;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  provinceId?: number;
}

export interface IBook {
  id?: number;
  name: string;
  author: string;
  salePrice: number;
  rentPrice: number;
  numOfCopies: number;
  // description: string;
  images: string[];
  categoryIds: number[];
}

export interface IOrder {
  id?: number;
  status: OrderStatus;
  storeId: number;
}

export interface IOrderDetail {
  id?: number;
  quantity: number;
  bookId: number;
}

export interface IOrderDetail {
  id?: number;
  bookId: number;
  quantity: number;
}
