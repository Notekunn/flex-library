import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import HistoryScreen from '../screens/HistoryScreen';
import { RootTabParamList } from '../types';
import { mainColor } from '../constants/Colors';
import InfoCart from '../screens/Account/InfoCart';

const Tab = createMaterialTopTabNavigator<RootTabParamList>();

const TopBarNavigatorCart = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="InfoCart"
        component={InfoCart}
        options={{
          title: 'Giỏ hàng',
          swipeEnabled: false,
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: 'bold',
          },
          tabBarActiveTintColor: mainColor,
          tabBarInactiveTintColor: '#ccc',
          tabBarIndicatorStyle: {
            backgroundColor: mainColor,
          },
        }}
      />
      <Tab.Screen
        name="History"
        component={HistoryScreen}
        options={{
          title: 'Lịch sử',
          swipeEnabled: false,
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: 'bold',
          },
          tabBarActiveTintColor: mainColor,
          tabBarInactiveTintColor: '#ccc',
          tabBarIndicatorStyle: {
            backgroundColor: mainColor,
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default TopBarNavigatorCart;

const styles = StyleSheet.create({});
