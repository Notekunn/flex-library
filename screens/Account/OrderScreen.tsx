import { Dimensions, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { TabBar, TabView } from 'react-native-tab-view';
import { mainColor, seconColor, whiteColor } from '../../constants/Colors';
import { RootStackScreenProps } from '../../types';
import { OrderDetailTab, OrderStatus } from '../../components/OrderDetailTab';

const renderTabBar = (props: any) => (
  <TabBar
    {...props}
    indicatorStyle={{ backgroundColor: mainColor }}
    style={{ backgroundColor: '#F2F2F2' }}
    activeColor={mainColor}
    inactiveColor="#000"
    labelStyle={{
      fontSize: 12,
    }}
  />
);
const initialLayout = { width: Dimensions.get('window').width };

export const OrderScreen: React.FC<RootStackScreenProps<'Order'>> = ({ navigation, route }) => {
  const [routes] = React.useState([
    { key: 'first', title: 'Chờ thanh toán', status: 'created' },
    { key: 'second', title: 'Chờ nhận hàng', status: 'purchased' },
    { key: 'three', title: 'Hoàn tất', status: 'completed' },
    { key: 'four', title: 'Đã huỷ', status: 'cancelled' },
  ]);
  const [index, setIndex] = useState(0);
  const renderScene = ({ route }: { route: Record<'key' | 'title' | 'status', string> }) => {
    return <OrderDetailTab status={route.status as OrderStatus} />;
  };

  return (
    <View style={{ flex: 1 }}>
      <TabView
        renderTabBar={renderTabBar}
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={initialLayout}
        style={styles.container1}
        swipeEnabled={false}
        lazy
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container1: {},
});
