import { Dimensions, StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { TabBar, TabView } from 'react-native-tab-view';
import { mainColor, seconColor, whiteColor } from '../../constants/Colors';
import { RootStackScreenProps } from '../../types';
import { useAppDispatch, useAppSelector } from '../../app/hook';
import { GetAllOrderByStore, selectOrder, selectOrderLoading } from '../../reducers/orderManagementSlice';
import { selectUser } from '../../reducers/authSlice';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Button, ListItem } from '@rneui/themed';
import { moneyFormat } from '../../constants/Money';
import { IOrder, IResponseOrderDetail } from '../../constants/interface';
import { or } from 'react-native-reanimated';
// import { OrderStatus } from '../../components/OrderDetailTab';
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

export const OrderManagementScreen: React.FC<RootStackScreenProps<'Order'>> = ({ navigation, route }) => {
  const [routes] = React.useState([
    { key: 'first', title: 'Đơn đang chờ', status: 'purchased' },
    // { key: 'second', title: 'Xác nhận', status: 'confirm' },
    { key: 'three', title: 'Đã xác nhận', status: 'completed' },
    { key: 'second', title: 'Đơn đã huỷ', status: 'cancelled' },
  ]);
  const [index, setIndex] = useState(0);
  const renderScene = ({ route }: { route: Record<'key' | 'title' | 'status', string> }) => {
    return <OrderManagementList status={route.status as OrderStatus} />;
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
export type OrderStatus = 'created' | 'purchased' | 'cancelled' | 'completed';
export interface OrderDetailTabProps {
  status: OrderStatus;
}
const OrderManagementList: React.FC<OrderDetailTabProps> = ({ status = 'purchased' }) => {
  const nav = useNavigation();
  const data = useAppSelector(selectOrder(status));
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  useEffect(() => {
    if (user) dispatch(GetAllOrderByStore({ status }));
  }, []);
  return (
    <ScrollView>
      <View>
        {data.map(
          (order, index) =>
            order && (
              <TouchableOpacity onPress={() => nav.navigate('OrderConfirm', { orderId: order.id })}>
                <View style={styles.store} key={index}>
                  {/* <TouchableOpacity onPress={() => nav.navigate('Store', { id: order.store.id })}> */}
                  <View style={styles.store_infor}>
                    {/* <Image
                      style={styles.store_img}
                      source={{
                        uri: order?.user?.avatar || 'https://tse1.mm.bing.net/th?q=solo%20leveling%20manga%20rock',
                      }}
                    /> */}
                    <Text style={{ fontSize: 20, fontWeight: '200' }}>
                      Mã đơn hàng: <Text style={{ fontSize: 20, fontWeight: '400' }}>{order?.id}</Text>
                    </Text>
                    {/* <MaterialIcons name="arrow-forward-ios" size={20} color="black" /> */}
                  </View>
                  {/* </TouchableOpacity> */}
                  <View style={styles.store_list}>
                    <CardItem item={order} status={'created'} />
                  </View>
                </View>
              </TouchableOpacity>
            ),
        )}
      </View>
    </ScrollView>
  );
};
interface IItemCarProps {
  item: IOrder;
  status: 'created' | 'purchased' | 'cancelled' | 'completed';
}
export const CardItem: React.FC<IItemCarProps> = ({ item, status }) => {
  const dispatch = useAppDispatch();
  const nav = useNavigation<RootStackScreenProps<'ViewBook'>['navigation']>();
  // const [quantity, setQuantity] = React.useState(item.quantity);
  // useEffect(() => {
  //   setQuantity(item.quantity);
  // }, [item.quantity]);

  // const handleMinus = () => {
  //   setQuantity(quantity - 1);
  //   dispatch(
  //     UpdateOrderDetailAction({
  //       bookId: item.book.id,
  //       quantity: 1,
  //       action: OrderDetailAction.SUB,
  //     }),
  //   );
  // };
  // const handlePlus = () => {
  //   setQuantity(quantity + 1);
  //   dispatch(
  //     UpdateOrderDetailAction({
  //       bookId: item.book.id,
  //       quantity: 1,
  //       action: OrderDetailAction.ADD,
  //     }),
  //   );
  // };
  // const leftContent = (reset: () => void) => (
  //   <Button
  //     title="Info"
  //     onPress={() => {
  //       reset();
  //       nav.push('ViewBook', {
  //         id: item.book.id,
  //       });
  //     }}
  //     icon={{
  //       name: 'info',
  //       type: 'feather',
  //       color: 'white',
  //     }}
  //     buttonStyle={{
  //       minHeight: '100%',
  //       backgroundColor: '#0052d1',
  //     }}
  //   />
  // );
  // const rightContent = (reset: () => void) => (
  //   <Button
  //     title="Delete"
  //     onPress={() => {
  //       dispatch(
  //         UpdateOrderDetailAction({
  //           bookId: item.book.id,
  //           quantity: 0,
  //           action: OrderDetailAction.REMOVE,
  //         }),
  //       );
  //       reset();
  //     }}
  //     icon={{
  //       name: 'trash',
  //       type: 'feather',
  //       color: 'white',
  //     }}
  //     buttonStyle={{
  //       minHeight: '100%',
  //       backgroundColor: '#f84b2f',
  //     }}
  //   />
  // );
  return (
    <View style={styles.itemInCart}>
      <View style={{ flexDirection: 'row' }}>
        <View style={{ flex: 1 }}>
          <View style={styles.itemOfOrder}>
            <Text style={styles.label}>Tên khách hàng:</Text>
            <View style={{ flexDirection: 'row' }}>
              <Text>{item.user.name}</Text>
            </View>
          </View>
          <View style={styles.itemOfOrder}>
            <Text style={styles.label}>Tổng số mặt hàng:</Text>
            <Text>{item.orderDetails.length}</Text>
          </View>
          <View style={styles.itemOfOrder}>
            <Text style={styles.label}>Tổng số tiền:</Text>
            <Text>{moneyFormat(item.totalAmount)}</Text>
          </View>
        </View>
        <Image
          style={styles.store_img}
          source={{
            uri: item?.user?.avatar || 'https://tse1.mm.bing.net/th?q=solo%20leveling%20manga%20rock',
          }}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  label: {},
  itemOfOrder: {
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  container1: {},
  title: {
    fontSize: 20,
    fontWeight: '500',
    color: '#c4c4c4',
  },
  imageLogoEmty: {
    height: 300,
    resizeMode: 'stretch',
    width: '100%',
  },
  text: {
    fontSize: 13,
    color: mainColor,
    fontWeight: '500',
  },
  item: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  info: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  image: {
    width: 70,
    height: 80,
    resizeMode: 'stretch',
    borderRadius: 5,
  },
  detail: {
    flexDirection: 'column',
    marginLeft: 10,
    padding: 10,
  },
  quantity: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 100,
  },
  store: {
    backgroundColor: '#fff',
    marginTop: 10,
  },
  store_infor: {
    flexDirection: 'row',
    height: 50,
    alignItems: 'center',
    paddingLeft: 15,
  },
  store_img: {
    alignSelf: 'center',
    justifyContent: 'center',
    marginVertical: 5,
    // marginHorizontal: 10,
    marginLeft: 15,
    height: 60,
    width: 60,
    resizeMode: 'cover',
    borderRadius: 60 / 2,
  },
  itemInCart: {
    paddingHorizontal: 15,
  },
  store_list: {
    // borderBottomWidth: 0.5,
    // borderTopWidth: 0.2,
  },
  price: {
    // position: 'absolute',
    // bottom: 0,
    height: 50,
    alignItems: 'center',
    justifyContent: 'flex-end',
    flexDirection: 'row',
  },
  pay: {
    height: 50,
    width: 120,
    backgroundColor: mainColor,

    justifyContent: 'center',
    alignItems: 'center',
  },
  dates: {
    // borderBottomWidth: 0.5,
    paddingVertical: 10,
  },
  date: {
    // paddingTop: 10,
    flexDirection: 'row',
    // justifyContent: 'flex-end',
    alignItems: 'center',
  },
  dateIcon: {
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    width: 115,
    // backgroundColor: mainColor,
  },
  dateText: {
    minWidth: 130,
    marginHorizontal: 15,
  },
});
