export interface ICategory {
  name: string;
}
export interface IUser {
  id: string;
  name: string;
  email: string;
  avatarURL?: string;
}

export interface IStore {
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  provinceId?: number;
}
