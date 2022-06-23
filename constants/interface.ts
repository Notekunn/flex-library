export interface ICategory {
  name: string;
}
export interface IUser {
  id: string;
  name: string;
  email: string;
  avatar: string;
}

export interface IStore {
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  provinceId?: number;
}

export interface IBook {
  id?: number;
  name: string;
  price: number;
  salePrice: number;
  rentPrice: number;
  description: string;
  image: string;
}
