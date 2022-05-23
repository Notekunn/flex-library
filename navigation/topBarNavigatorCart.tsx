import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import CartScreen from '../screens/CartScreen';
import HistoryScreen from '../screens/HistoryScreen';
import { RootTabParamList } from '../types';

const Tab = createMaterialTopTabNavigator<RootTabParamList>();

const TopBarNavigatorCart = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={{
          swipeEnabled: false,
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: 'bold',
          },
          tabBarActiveTintColor: '#ce4144',
          tabBarInactiveTintColor: '#ccc',
          tabBarIndicatorStyle: {
            backgroundColor: '#ce4144',
          },
        }}
      />
      <Tab.Screen
        name="History"
        component={HistoryScreen}
        options={{
          swipeEnabled: false,
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: 'bold',
          },
          tabBarActiveTintColor: '#ce4144',
          tabBarInactiveTintColor: '#ccc',
          tabBarIndicatorStyle: {
            backgroundColor: '#ce4144',
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default TopBarNavigatorCart;

const styles = StyleSheet.create({});
