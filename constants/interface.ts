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
  id: number;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  provinceId?: number;
  avatarURL?: string;
}

export interface IBook {
  id: number;
  name: string;
  author: string;
  salePrice: number;
  rentPrice: number;
  numOfCopies: number;
  // description: string;
  images: string[];
  categories: number[];
}

export interface IOrder {
  id: number;
  store: IStore;
  orderDetails: Array<IOrderDetail>;
  totalAmount: number;
}

export interface IOrderDetail {
  id: number;
  quantity: number;
  book: IBook;
}

export interface ISearchBook {
  page: number;
  take: number;
  query: string;
  sort: string;
}
