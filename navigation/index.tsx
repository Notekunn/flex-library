import { FontAwesome } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { ColorSchemeName, Pressable } from 'react-native';
import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import {
  RootStackParamList,
  RootTabParamList,
  RootTabScreenProps,
} from '../types';
import LinkingConfiguration from './LinkingConfiguration';

import IntroScreen from '../screens/IntroScreen';
import ModalScreen from '../screens/ModalScreen';
import NotFoundScreen from '../screens/NotFoundScreen';
import SignInScreen from '../screens/SignInScreen';
import HomeScreen from '../screens/HomeScreen';
import MyIdScreen from '../screens/MyIdScreen';
import ScanScreen from '../screens/ScanScreen';
import StoreScreen from '../screens/StoreScreen';
import AccountScreen from '../screens/AccountScreen';
import { StatusBar } from 'react-native';
import ModalItem from '../modals/ModalItem';

export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName;
}) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
    >
      <RootNavigator />
    </NavigationContainer>
  );
}

const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='Root'
        component={BottomTabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='Intro'
        component={IntroScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='SignIn'
        component={SignInScreen}
        options={{ headerShown: false }}
      />
      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen
          name='ModalItem'
          options={{ headerShown: false }}
          component={ModalItem}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
}
const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName='Home'
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
        tabBarStyle: {
          paddingTop: StatusBar.currentHeight,
        },
      }}
    >
      <BottomTab.Screen
        name='Home'
        component={HomeScreen}
        options={{
          headerShown: false,
          title: 'Home',

          tabBarIcon: ({ color }) => <TabBarIcon name='home' color={color} />,
        }}
      />
      <BottomTab.Screen
        name='MyID'
        component={MyIdScreen}
        options={{
          title: 'My ID',
          tabBarIcon: ({ color }) => (
            <TabBarIcon name='id-badge' color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name='Scan'
        component={ScanScreen}
        options={{
          title: 'Scan Code',
          tabBarIcon: ({ color }) => <TabBarIcon name='qrcode' color={color} />,
        }}
      />
      <BottomTab.Screen
        name='Store'
        component={StoreScreen}
        options={{
          title: 'Store',
          tabBarIcon: ({ color }) => (
            <TabBarIcon name='shopping-cart' color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name='Account'
        component={AccountScreen}
        options={{
          title: 'Account',
          tabBarIcon: ({ color }) => <TabBarIcon name='user' color={color} />,
        }}
      />
    </BottomTab.Navigator>
  );
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}
