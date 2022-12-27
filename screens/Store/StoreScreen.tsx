import { StyleSheet, Text, View, Image, TouchableOpacity, Dimensions } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Feather, Fontisto, Entypo, FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { TabView, SceneMap, TabBar, SceneRendererProps } from 'react-native-tab-view';
import BookList from '../../components/Store/BookList';
import { mainColor, seconColor } from '../../constants/Colors';
import { useAppDispatch, useAppSelector } from '../../app/hook';
import { GetStoreByIdAction, selectCurrentStore } from '../../reducers/storeSlice';
import { RootStackScreenProps } from '../../types';
import NotFoundScreen from '../NotFoundScreen';
import { TextInput } from 'react-native-gesture-handler';
import SplashScreen from '../SplashScreen';
import { selectOwnStore } from '../../reducers/authSlice';
const initialLayout = { width: Dimensions.get('window').width };

const StoreScreen: React.FC<RootStackScreenProps<'Store'>> = ({ route }) => {
  const { id: storeId } = route.params || {};
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const store = useAppSelector(selectCurrentStore);
  const ownStore = useAppSelector(selectOwnStore);
  const [query, setQuery] = useState('');
  const isLoading = useAppSelector((state) => state.store.loading);
  const isOwnStore = store && store.id === ownStore?.id;
  useEffect(() => {
    if (storeId) {
      dispatch(GetStoreByIdAction(storeId));
    }
  }, [storeId]);

  const renderTabBar = (props: any) => (
    <TabBar {...props} indicatorStyle={{ backgroundColor: '#FFF' }} style={{ backgroundColor: mainColor }} />
  );

  const [index, setIndex] = useState(0);

  const [routes] = React.useState([
    { key: 'first', title: 'Shop' },
    { key: 'second', title: 'Nhận xét' },
  ]);
  const renderScene = ({ route }: { route: any }) => {
    switch (route.key) {
      case 'first':
      case 'second':
        return <BookList storeId={store?.id} q={query} />;
      default:
        return null;
    }
  };

  if (isLoading === 'idle') return <SplashScreen />;
  if (isLoading === 'error') return <NotFoundScreen />;
  if (!storeId || !store) {
    return <NotFoundScreen />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.header_top}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Entypo style={{ marginLeft: 10 }} name="chevron-left" size={35} color="#4C4CD7" />
          </TouchableOpacity>
          <TouchableOpacity>
            <View
              style={{
                height: 30,
                width: 250,
                borderWidth: 1,
                paddingHorizontal: 8,
                alignItems: 'center',
                flexDirection: 'row',
                borderRadius: 10,
                borderColor: mainColor,
                // left: -30,
              }}
            >
              <FontAwesome5 name="search" size={16} color={mainColor} />
              <TextInput
                style={{ color: 'black', marginLeft: 5 }}
                placeholder="Tìm kiếm trên cửa hàng"
                value={query}
                onChangeText={setQuery}
              />
            </View>
          </TouchableOpacity>
          <View style={{ flexDirection: 'row', paddingLeft: 15 }}>
            <Fontisto style={{ marginHorizontal: 5 }} name="share-a" size={24} color="#4C4CD7" />
            <TouchableOpacity onPress={() => navigation.navigate('OrderManagement')}>
              <Feather style={{ marginHorizontal: 5 }} name="shopping-cart" size={24} color="#4C4CD7" />
            </TouchableOpacity>
            <Entypo style={{ marginLeft: 5 }} name="dots-three-vertical" size={24} color="#4C4CD7" />
          </View>
        </View>
        <View style={styles.header_center}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingHorizontal: 15,
              paddingTop: 15,
            }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Image
                style={{
                  height: 60,
                  width: 60,
                  resizeMode: 'contain',
                  borderRadius: 30,
                }}
                source={{
                  uri:
                    store?.avatarURL ||
                    'https://cdn.realsport101.com/images/ncavvykf/epicstream/4496c3fab7ca90b76d0069f0d671f2cad7dbe565-1920x1080.jpg?rect=1,0,1919,1080&w=700&h=394&dpr=2',
                }}
              />
              <View style={{ paddingLeft: 15 }}>
                <Text style={{ fontSize: 20 }}>{store?.name}</Text>
                <Text style={{ fontSize: 12, color: 'gray' }}>Online 11 giờ trước</Text>
              </View>
            </View>
            <TouchableOpacity onPress={() => isOwnStore && navigation.navigate('AddBook')}>
              <View style={styles.button_follow}>
                <Text style={{ color: '#4C4CD7' }}>{isOwnStore ? 'Thêm sách' : 'Theo dõi'}</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.store_bottom}>
            <View style={styles.store_analysis}>
              <Text style={{ color: '#4C4CD7' }}>2,6k</Text>
              <Text>Sản phẩm</Text>
            </View>
            <View style={styles.column}></View>
            <View style={styles.store_analysis}>
              <Text style={{ color: '#4C4CD7' }}>4,9</Text>
              <Text>Đánh giá</Text>
            </View>
            <View style={styles.column}></View>
            <View style={styles.store_analysis}>
              <Text style={{ color: '#4C4CD7' }}>99%</Text>
              <Text>Phản hồi Chat</Text>
            </View>
          </View>
        </View>
      </View>
      <View style={{ flex: 1 }}>
        <TabView
          renderTabBar={renderTabBar}
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={initialLayout}
          style={styles.container1}
        />
      </View>
    </View>
  );
};

export default StoreScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header_top: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  header: {
    paddingTop: 50,
    backgroundColor: seconColor,
  },
  store_bottom: {
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'space-around',
    paddingBottom: 15,
  },
  header_center: {
    flexDirection: 'column',
  },
  button_follow: {
    borderWidth: 2,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
    borderColor: '#4C4CD7',
    borderRadius: 4,
  },
  store_analysis: {
    marginRight: 10,
    alignItems: 'center',
  },
  column: {
    height: 15,
    borderRightWidth: 1,
    borderColor: 'gray',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  container1: {
    // marginTop: StatusBar.currentHeight,
  },
  scene: {
    flex: 1,
  },
});
