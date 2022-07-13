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
import SignInScreen from '../screens/Auth/SignInScreen';
import HomeScreen from '../screens/Home/HomeScreen';
import ScanScreen from '../screens/Admin/ScanScreen';
import StoreScreen from '../screens/Store/StoreScreen';
import AccountScreen from '../screens/Account/AccountScreen';
import SearchScreen from '../screens/Search/SearchScreen';
import { ViewBookScreen } from '../screens/Book/ViewBookScreen';
import { AddBookScreen } from '../screens/Book/AddBookScreen';
import { EditBookScreen } from '../screens/Book/EditBookScreen';
import { useAppDispatch, useAppSelector } from '../app/hook';
import { profileAction, selectIsLoggedIn, selectLoading, selectOwnStore, selectUser } from '../reducers/authSlice';
import { ItemHeaderRight } from '../components/Item/HeaderRight';
import SignUpScreen from '../screens/Auth/SignUpScreen';
import ProfileScreen from '../screens/Account/ProfileScreen';
import ChangePasswordScreen from '../screens/ChangePasswordScreen';
import CreateStoreScreen from '../screens/Account/CreateStoreScreen';
import CategoryScreen from '../screens/CategoryScreen';
import ListBookScreen from '../screens/ListBookScreen';
import ViewMyStoreScreen from '../screens/Account/ViewMyStoreScreen';
import SearchResultScreen from '../screens/Search/SearchResultScreen';
import { OrderScreen } from '../screens/Account/OrderScreen';
import { RentingScreen } from '../screens/RentingScreen';
import { OrderQRCodeModal } from '../modals/OrderQRCode';
import { UserRole } from '../constants/enum';
import { OrderConfirmScreen } from '../screens/Admin/OrderConfirmScreen';

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
    dispatch(profileAction());
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
      {!(isLoggedIn && loading === 'success') ? (
        <>
          <Stack.Screen name="SignIn" component={SignInScreen} />
          <Stack.Screen name="SignUp" component={SignUpScreen} />
        </>
      ) : (
        <>
          <Stack.Screen name="Root" component={BottomTabNavigator} />
          <Stack.Screen name="Store" component={StoreScreen} />
          <Stack.Screen
            name="Order"
            component={OrderScreen}
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
          <Stack.Screen
            name="ViewBook"
            component={ViewBookScreen}
            options={{
              headerShown: false,
              headerTitle: '',
              headerTintColor: '#4C4CD7',
              headerBackTitle: '',
              headerRight: ItemHeaderRight,
            }}
          />
          <Stack.Screen name="AddBook" component={AddBookScreen} />
          <Stack.Screen name="EditBook" component={EditBookScreen} />
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
              name="OrderQRCodeModal"
              options={{
                animation: 'slide_from_bottom',
              }}
              component={OrderQRCodeModal}
            />
            <Stack.Screen
              name="OrderConfirm"
              component={OrderConfirmScreen}
              options={{
                animation: 'slide_from_bottom',
                headerShown: true,
                headerStyle: {
                  backgroundColor: mainColor,
                },
                headerTintColor: '#fff',
                headerTitle: 'Xác nhận đơn hàng',
              }}
            />
          </Stack.Group>
        </>
      )}
    </Stack.Navigator>
  );
}
const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  const ownStore = useAppSelector(selectOwnStore);
  const profile = useAppSelector(selectUser);

  const colorScheme = useColorScheme();
  const navigation = useNavigation();

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

      {profile?.role && [UserRole.Administrator, UserRole.Owner].includes(profile?.role) && (
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
            tabBarIcon: ({ color }) => (
              <TabBarIcon
                name="qrcode"
                color={color}
                onPress={() =>
                  navigation.navigate('Root', {
                    screen: 'Scan',
                  })
                }
              />
            ),
          }}
        />
      )}

      {ownStore && (
        <BottomTab.Screen
          name="MyStore"
          component={StoreScreen}
          options={{
            headerShown: false,
            title: 'Store',
            tabBarIcon: ({ color }) => (
              <TabBarIcon
                name="shopping-cart"
                color={color}
                onPress={() =>
                  navigation.navigate('Root', {
                    screen: 'MyStore',
                    params: {
                      id: ownStore.id,
                    },
                  })
                }
              />
            ),
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
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
  onPress?: () => void;
}) {
  return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}
