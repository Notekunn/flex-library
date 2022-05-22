import { FontAwesome } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DefaultTheme, DarkTheme, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { ColorSchemeName, Pressable, Text } from 'react-native';
import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import { RootStackParamList, RootTabParamList, RootTabScreenProps } from '../types';
import LinkingConfiguration from './LinkingConfiguration';
import { Feather, Fontisto, Entypo, FontAwesome5 } from '@expo/vector-icons';

import IntroScreen from '../screens/IntroScreen';
import ModalScreen from '../screens/ModalScreen';
import NotFoundScreen from '../screens/NotFoundScreen';
import SignInScreen from '../screens/SignInScreen';
import HomeScreen from '../screens/HomeScreen';
import MyIdScreen from '../screens/MyIdScreen';
import ScanScreen from '../screens/ScanScreen';
import StoreScreen from '../screens/StoreScreen';
import AccountScreen from '../screens/AccountScreen';
import { StatusBar, TextInput, View } from 'react-native';
import ModalItem from '../modals/ModalItem';
import ItemScreen from '../screens/ItemScreen';
import { ScreenStackHeaderBackButtonImage } from 'react-native-screens';
import CartScreen from '../screens/CartScreen';
// import { View } from '../components/Themed';

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer linking={LinkingConfiguration} theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Root" component={BottomTabNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="Intro" component={IntroScreen} options={{ headerShown: false }} />
      <Stack.Screen name="SignIn" component={SignInScreen} options={{ headerShown: false }} />
      <Stack.Screen
        name="Card"
        component={CartScreen}
        options={{
          headerShown: true,
          headerTitleAlign: 'center',
          headerTintColor: '#ce4144',
        }}
      />
      <Stack.Screen
        name="Item"
        component={ItemScreen}
        options={{
          headerShown: true,
          headerTitle: '',
          headerTintColor: '#4C4CD7',
          headerBackTitle: '',
          headerRight: () => (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <View
                style={{
                  height: 30,
                  width: 250,
                  borderWidth: 1,
                  paddingHorizontal: 8,
                  alignItems: 'center',
                  flexDirection: 'row',
                  borderRadius: 10,
                  // left: -30,
                }}
              >
                <FontAwesome5 name="search" size={16} color="gray" />
                <Text style={{ color: 'gray', marginLeft: 5 }}>Tìm kiếm trên FL</Text>
              </View>
              <View style={{ flexDirection: 'row', paddingLeft: 15 }}>
                <Fontisto style={{ marginHorizontal: 5 }} name="share-a" size={24} color="#4C4CD7" />
                <Feather style={{ marginHorizontal: 5 }} name="shopping-cart" size={24} color="#4C4CD7" />
                <Entypo style={{ marginLeft: 5 }} name="dots-three-vertical" size={24} color="#4C4CD7" />
              </View>
            </View>
          ),
        }}
      />
      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen name="ModalItem" options={{ headerShown: false }} component={ModalItem} />
      </Stack.Group>
    </Stack.Navigator>
  );
}
const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  const colorScheme = useColorScheme();
  const navigation = useNavigation<any>();
  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
        tabBarStyle: {
          paddingTop: StatusBar.currentHeight,
        },
      }}
    >
      <BottomTab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
          title: 'Home',

          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="MyID"
        component={MyIdScreen}
        options={{
          title: 'My ID',
          tabBarIcon: ({ color }) => <TabBarIcon name="id-badge" color={color} />,
        }}
        listeners={() => ({
          tabPress: (event) => {
            event.preventDefault();
            navigation.navigate('ModalItem');
          },
        })}
      />
      <BottomTab.Screen
        name="Scan"
        component={ScanScreen}
        options={{
          title: 'Scan Code',
          tabBarIcon: ({ color }) => <TabBarIcon name="qrcode" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Store"
        component={StoreScreen}
        options={{
          headerShown: false,
          title: 'Store',
          tabBarIcon: ({ color }) => <TabBarIcon name="shopping-cart" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Account"
        component={AccountScreen}
        options={{
          title: 'Account',
          tabBarIcon: ({ color }) => <TabBarIcon name="user" color={color} />,
        }}
      />
    </BottomTab.Navigator>
  );
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: { name: React.ComponentProps<typeof FontAwesome>['name']; color: string }) {
  return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}