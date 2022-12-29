/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps, NavigatorScreenParams } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { IBookResponse } from './constants/interface';
import { SearchSortTypes } from './constants/SearchSort';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type RootStackParamList = {
  AddBook: undefined;
  EditBook: {
    book: IBookResponse;
  };
  ViewBook: { id: number };
  ModalItem: undefined;
  Splash: undefined;
  SignIn: undefined;
  SignUp: undefined;
  Root: NavigatorScreenParams<RootTabParamList> | undefined;
  Store: { id?: number };
  Order: undefined;
  BookCategory: undefined;
  Renting: undefined;
  Search: undefined;
  ResultSearch: { sort?: SearchSortTypes; store?: number; categories?: number[]; barcode?: string };
  Profile: undefined;
  ChangePassword: undefined;
  CreateStore: undefined;
  ViewMyStore: undefined;
  Category: { chooseCategories: number[]; setChooseCategories: (n: number[]) => void };
  ListBookCategory: undefined;
  OrderQRCodeModal: { orderId: number };
  OrderConfirm: { orderId: number };
  OrderManagement: undefined;
  CoinScreen: undefined;
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> = NativeStackScreenProps<
  RootStackParamList,
  Screen
>;

export type RootTabParamList = {
  Intro: undefined;
  Scan?: { action?: string };
  Account: undefined;
  Home: undefined;
  MyStore: { id?: number };
};

export type RootTabScreenProps<Screen extends keyof RootTabParamList> = CompositeScreenProps<
  BottomTabScreenProps<RootTabParamList, Screen>,
  NativeStackScreenProps<RootStackParamList>
>;
