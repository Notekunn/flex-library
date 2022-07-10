import { Dimensions, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { SceneMap, TabBar, TabView } from 'react-native-tab-view';
import CartScreen from '../CartScreen';
import { mainColor, seconColor, whiteColor } from '../../constants/Colors';
import HistoryScreen from '../HistoryScreen';
import RentingBooks from '../RentingBooks';
import WaitPayment from '../WaitPayment';
import WaitGetMachandise from '../WaitGetMerchandise';

const renderTabBar = (props: any) => (
  <TabBar
    {...props}
    indicatorStyle={{ backgroundColor: mainColor }}
    style={{ backgroundColor: '#F2F2F2' }}
    activeColor={mainColor}
    inactiveColor="#000"
  />
);
const initialLayout = { width: Dimensions.get('window').width };

const InfoCart = () => {
  const [routes] = React.useState([
    { key: 'first', title: 'Giỏ hàng' },
    { key: 'second', title: 'Chờ thanh toán' },
    { key: 'three', title: 'Chờ nhận hàng' },
    // { key: 'four', title: 'Đã thuê' },
  ]);
  const [index, setIndex] = useState(0);
  return (
    <View style={{ flex: 1 }}>
      <TabView
        renderTabBar={renderTabBar}
        navigationState={{ index, routes }}
        renderScene={SceneMap({
          first: CartScreen,
          second: WaitPayment,
          three: WaitGetMachandise,
          //   four: RentingBooks,
        })}
        onIndexChange={setIndex}
        initialLayout={initialLayout}
        style={styles.container1}
      />
    </View>
  );
};

export default InfoCart;

const styles = StyleSheet.create({
  container1: {},
});
