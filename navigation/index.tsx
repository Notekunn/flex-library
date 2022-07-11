import { FontAwesome } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DefaultTheme, DarkTheme, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect } from 'react';
import { ColorSchemeName, Pressable, Text } from 'react-native';
import Colors, { mainColor } from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import { RootStackParamList, RootTabParamList, RootTabScreenProps } from '../types';
import LinkingConfiguration from './LinkingConfiguration';

import SplashScreen from '../screens/SplashScreen';
import NotFoundScreen from '../screens/NotFoundScreen';
import SignInScreen from '../screens/Auth/SignInScreen';
import HomeScreen from '../screens/Home/HomeScreen';
import MyIdScreen from '../screens/MyIdScreen';
import ScanScreen from '../screens/ScanScreen';
import StoreScreen from '../screens/Store/StoreScreen';
import MyStoreScreen from '../screens/Store/MyStoreScreen';
import AccountScreen from '../screens/Account/AccountScreen';
import ModalItem from '../modals/ModalItem';
import ItemScreen from '../screens/ItemScreen';
import SearchScreen from '../screens/Search/SearchScreen';
import AddItem from '../screens/AddItem';
import { useAppDispatch, useAppSelector } from '../app/hook';
import { profileAction, selectIsLoggedIn, selectLoading } from '../reducers/authSlice';
import { ItemHeaderRight } from '../components/Item/HeaderRight';
import SignUpScreen from '../screens/Auth/SignUpScreen';
import ProfileScreen from '../screens/Account/ProfileScreen';
import ChangePasswordScreen from '../screens/ChangePasswordScreen';
import CreateStoreScreen from '../screens/Account/CreateStoreScreen';
import CategoryScreen from '../screens/CategoryScreen';
import ListBookScreen from '../screens/ListBookScreen';
import { GetStoreByUserAction, selectUserStore } from '../reducers/storeSlice';
import ViewMyStoreScreen from '../screens/Account/ViewMyStoreScreen';
import SearchResultScreen from '../screens/Search/SearchResultScreen';
import InfoCart from '../screens/Account/InfoCart';
import { RentingScreen } from '../screens/RentingScreen';

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer linking={LinkingConfiguration} theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  const loading = useAppSelector(selectLoading);
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (!isLoggedIn) {
      dispatch(profileAction());
    }
  }, []);

  if (loading == 'loading') {
    return (
      <Stack.Navigator>
        <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false, animation: 'none' }} />
      </Stack.Navigator>
    );
  }
  return (
    <Stack.Navigator screenOptions={{ headerShown: false, animation: 'none' }}>
      {!isLoggedIn ? (
        <>
          <Stack.Screen name="SignIn" component={SignInScreen} />
          <Stack.Screen name="SignUp" component={SignUpScreen} />
        </>
      ) : (
        <>
          <Stack.Screen name="Root" component={BottomTabNavigator} />
          <Stack.Screen
            name="Item"
            component={ItemScreen}
            options={{
              headerShown: false,
              headerTitle: '',
              headerTintColor: '#4C4CD7',
              headerBackTitle: '',
              headerRight: ItemHeaderRight,
            }}
          />
          <Stack.Screen name="Store" component={StoreScreen} />
          <Stack.Screen
            name="InfoCart"
            component={InfoCart}
            options={{
              headerShown: true,
              headerStyle: {
                backgroundColor: mainColor,
              },
              headerTintColor: '#fff',
              headerTitle: 'Đơn hàng',
            }}
          />
          <Stack.Screen
            name="Profile"
            component={ProfileScreen}
            options={{
              headerShown: true,
              headerTitleAlign: 'center',
              headerTitleStyle: {
                fontFamily: 'SansPro',
              },
              headerStyle: {
                backgroundColor: mainColor,
              },
              headerTintColor: '#fff',
            }}
          />
          <Stack.Screen name="CreateStore" component={CreateStoreScreen} />
          <Stack.Screen name="ViewMyStore" component={ViewMyStoreScreen} />
          <Stack.Screen name="ChangePassword" component={ChangePasswordScreen} />
          <Stack.Screen name="AddItem" component={AddItem} />
          <Stack.Screen name="Category" component={CategoryScreen} />
          <Stack.Screen name="ResultSearch" component={SearchResultScreen} />
          <Stack.Screen name="ListBookCategory" component={ListBookScreen} />
          <Stack.Screen
            name="Renting"
            component={RentingScreen}
            options={{
              headerShown: true,
              headerStyle: {
                backgroundColor: mainColor,
              },
              headerTintColor: '#fff',
              headerTitle: 'Sách đang mượn',
            }}
          />
          <Stack.Screen name="Search" component={SearchScreen} options={{ animation: 'fade' }} />
          <Stack.Group screenOptions={{ presentation: 'modal', animation: 'fade' }}>
            <Stack.Screen
              name="ModalItem"
              options={{
                animation: 'slide_from_bottom',
              }}
              component={ModalItem}
            />
          </Stack.Group>
        </>
      )}
    </Stack.Navigator>
  );
}
const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  const mystore = useAppSelector(selectUserStore);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(GetStoreByUserAction());
  }, []);

  const colorScheme = useColorScheme();
  const navigation = useNavigation<any>();

  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
        headerTransparent: true,
        headerShown: false,
      }}
    >
      <BottomTab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
          title: 'Home',
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
          headerTransparent: true,
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
          headerStyle: {
            backgroundColor: mainColor,
          },
          headerTitleStyle: {
            color: '#fff',
            fontSize: 20,
          },
          title: 'Scan Code',
          tabBarIcon: ({ color }) => <TabBarIcon name="qrcode" color={color} />,
        }}
      />

      {mystore && (
        <BottomTab.Screen
          name="MyStore"
          component={MyStoreScreen}
          options={{
            headerShown: false,
            title: 'Store',
            tabBarIcon: ({ color }) => <TabBarIcon name="shopping-cart" color={color} />,
          }}
        />
      )}

      <BottomTab.Screen
        name="Account"
        component={AccountScreen}
        options={{
          title: 'Account',
          headerStyle: {
            backgroundColor: mainColor,
          },
          headerTitleStyle: {
            color: '#fff',
            fontSize: 20,
          },
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
