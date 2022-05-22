/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps, NavigatorScreenParams } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type RootStackParamList = {
  // SignIn: NavigatorScreenParams<RootTabParamList> | undefined;
  ModalItem: undefined;
  Intro: undefined;
  Home: undefined;
  SignIn: undefined;
  Setting: undefined;
  Card: undefined;
  Root: NavigatorScreenParams<RootTabParamList> | undefined;
  Item: { id: number };
  Store: undefined;
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> = NativeStackScreenProps<
  RootStackParamList,
  Screen
>;

export type RootTabParamList = {
  MyID: undefined;
  Scan: undefined;
  Account: undefined;
  Home: undefined;
  Store: undefined;
  Intro: undefined;
  Card: undefined;
  SignIn: undefined;
};

export type RootTabScreenProps<Screen extends keyof RootTabParamList> = CompositeScreenProps<
  BottomTabScreenProps<RootTabParamList, Screen>,
  NativeStackScreenProps<RootStackParamList>
>;