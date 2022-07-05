/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps, NavigatorScreenParams } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SearchSortTypes } from './constants/SearchSort';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type RootStackParamList = {
  // SignIn: NavigatorScreenParams<RootTabParamList> | undefined;
  Intro: undefined;
  ModalItem: undefined;
  Splash: undefined;
  Home: undefined;
  SignIn: undefined;
  SignUp: undefined;
  Setting: undefined;
  Root: NavigatorScreenParams<RootTabParamList> | undefined;
  Item: { id: number };
  Store: { id: number };
  MyStore: undefined;
  InfoCart: undefined;
  BookCategory: undefined;
  Cart: undefined;
  History: undefined;
  Search: undefined;
  ResultSearch: { sort?: SearchSortTypes; store?: number };
  AddItem: undefined;
  Profile: undefined;
  ChangePassword: undefined;
  CreateStore: undefined;
  ViewMyStore: undefined;
  Category: undefined;
  ListBookCategory: undefined;
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> = NativeStackScreenProps<
  RootStackParamList,
  Screen
>;

export type RootTabParamList = {
  Intro: undefined;
  MyID: undefined;
  Splash: undefined;
  ResultSearch: undefined;
  Scan: undefined;
  Account: undefined;
  Home: undefined;
  Store: undefined;
  MyStore: undefined;
  SignIn: undefined;
  InfoCart: undefined;
  BookCategory: undefined;
  Cart: undefined;
  History: undefined;
  SignUp: undefined;
  Profile: undefined;
  ChangePassword: undefined;
  CreateStore: undefined;
  ViewMyStore: undefined;
  ListBookCategory: undefined;
};

export type RootTabScreenProps<Screen extends keyof RootTabParamList> = CompositeScreenProps<
  BottomTabScreenProps<RootTabParamList, Screen>,
  NativeStackScreenProps<RootStackParamList>
>;
