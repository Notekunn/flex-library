import { BookStatus, OrderStatus, ReturnBookType, UserRole } from './enum';
import { SearchSortTypes } from './SearchSort';

export interface BaseEntity {
  createdAt: string;
  updatedAt: string;
}
export interface ICategory {
  id: number;
  name: string;
}
export interface IUser {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: UserRole;
  coin: number;
}

export interface IUserResponse extends IUser {
  store: Omit<IStoreResponse, 'owner'>;
}
export interface IStore {
  id?: number;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  provinceId?: number;
  avatarURL?: string;
}

export interface IStoreResponse extends IStore {
  owner: Omit<IUserResponse, 'owner'>;
}
export interface IBook {
  id: number;
  name: string;
  author: string;
  salePrice: number;
  rentPrice: number;
  description: string;
  images: string[];
  categoryIds: number[];
  numOfCopies: number;
  barcode?: string;
}

export interface IBookResponse extends BaseEntity {
  id: number;
  name: string;
  author: string;
  salePrice: number;
  rentPrice: number;
  numOfCopies: number;
  description: string;
  images: string[];
  categories: ICategory[];
  store: IStore;
  rentCount: number;
  barcode: string;
}

export interface IOrder {
  id: number;
  store: IStore;
  orderDetails: Array<IResponseOrderDetail>;
  totalAmount: number;
  status: OrderStatus;
  user: IUser;
}

export interface IResponseOrderDetail {
  id: number;
  quantity: number;
  book: IBook;
}

export enum OrderDetailAction {
  SET = 'set',
  ADD = 'add',
  SUB = 'sub',
  REMOVE = 'remove',
}

export interface IBookLoanResponse extends BaseEntity {
  id: number;
  dueDate: string;
  order: IOrder;
  book: IBook;
}

export interface IOrderBookLoanResponse {
  order: IOrder;
  bookLoans: IBookLoanResponse[];
}

export interface IReturnBook {
  status: ReturnBookType;
}
export interface IOrderDetail {
  quantity: number;
  bookId: number;
  action?: OrderDetailAction;
}

export interface IOrderRequest {
  status: 'created' | 'purchased' | 'cancelled' | 'completed';
}

export interface ISearchBook {
  page?: number;
  take?: number;
  q?: string;
  sort: SearchSortTypes;
  store?: number;
  categories?: number[];
  barcode?: string;
}

export interface IPackagePayment {
  id: number;
  name: string;
  coin: number;
  avatarURL: string;
}

export interface IPaymentPackage {
  id: number;
  name: string;
  coin: number;
  price: number;
  imageUrl: string;
}
