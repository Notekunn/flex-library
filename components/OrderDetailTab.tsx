import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, Modal } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Button, Icon, ListItem } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import { mainColor } from '../constants/Colors';
import { useAppDispatch, useAppSelector } from '../app/hook';
import { GetOrderByUserAction, selectOrder } from '../reducers/orderSlice';
import { moneyFormat } from '../constants/Money';
import { RootStackScreenProps } from '../types';
import { IResponseOrderDetail, OrderDetailAction, IOrderDetail } from '../constants/interface';
import { UpdateOrderDetailAction } from '../reducers/orderSlice';

import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
interface IItemCarProps {
  item: IResponseOrderDetail;
}
const CardItem: React.FC<IItemCarProps> = ({ item }) => {
  const dispatch = useAppDispatch();
  const nav = useNavigation<RootStackScreenProps<'Item'>['navigation']>();
  const [quantity, setQuantity] = React.useState(item.quantity);
  const handleMinus = () => {
    dispatch(
      UpdateOrderDetailAction({
        bookId: item.book.id,
        quantity: 1,
        action: OrderDetailAction.SUB,
      }),
    );
  };
  const handlePlus = () => {
    dispatch(
      UpdateOrderDetailAction({
        bookId: item.book.id,
        quantity: 1,
        action: OrderDetailAction.ADD,
      }),
    );
  };
  return (
    <View style={styles.itemInCart}>
      <ListItem.Swipeable
        leftContent={(reset) => (
          <Button
            title="Info"
            onPress={() => {
              dispatch(
                UpdateOrderDetailAction({
                  bookId: item.book.id,
                  quantity: 0,
                  action: OrderDetailAction.REMOVE,
                }),
              );
              reset();
            }}
            icon={{
              name: 'info',
              type: 'feather',
              color: 'white',
            }}
            buttonStyle={{
              minHeight: '100%',
              backgroundColor: '#0052d1',
            }}
          />
        )}
        rightContent={(reset) => (
          <Button
            title="Delete"
            onPress={() => reset()}
            icon={{
              name: 'trash',
              type: 'feather',
              color: 'white',
            }}
            buttonStyle={{
              minHeight: '100%',
              backgroundColor: '#f84b2f',
            }}
          />
        )}
      >
        <ListItem.Content>
          <View style={styles.item}>
            <TouchableOpacity onPress={() => nav.push('Item', { id: item.book.id })}>
              <View style={styles.info}>
                <Image
                  source={{
                    uri:
                      item.book.images[0] ||
                      'https://tuoitho.mobi/upload/truyen/tham-tu-lung-danh-conan-tap-1/anh-bia.jpg',
                  }}
                  style={styles.image}
                />
                <View style={styles.detail}>
                  <Text
                    style={[
                      styles.text,
                      {
                        color: '#000',
                        marginBottom: 10,
                        fontWeight: '600',
                        fontSize: 16,
                        flexWrap: 'wrap',
                        textTransform: 'capitalize',
                      },
                    ]}
                  >
                    {item.book.name}
                  </Text>
                  <Text style={styles.text}>{moneyFormat(item.book.rentPrice)}</Text>
                </View>
              </View>
            </TouchableOpacity>
            <View style={styles.quantity}>
              <Button
                icon={{
                  name: 'minus',
                  type: 'font-awesome',
                  color: 'white',
                }}
                buttonStyle={{
                  backgroundColor: mainColor,
                  padding: 0,
                  height: 30,
                  width: 30,
                }}
                onPress={handleMinus}
              />
              <Text style={{ fontSize: 20 }}>{quantity}</Text>
              <Button
                icon={{
                  name: 'plus',
                  type: 'font-awesome',
                  color: 'white',
                }}
                buttonStyle={{
                  backgroundColor: mainColor,
                  padding: 0,
                  height: 30,
                  width: 30,
                }}
                onPress={handlePlus}
              />
            </View>
          </View>
        </ListItem.Content>
      </ListItem.Swipeable>
    </View>
  );
};
export type OrderStatus = 'created' | 'purchased' | 'canceled' | 'completed';
export interface OrderDetailTabProps {
  status: OrderStatus;
}

export const OrderDetailTab: React.FC<OrderDetailTabProps> = ({ status }) => {
  const nav = useNavigation<RootStackScreenProps<'InfoCart'>['navigation']>();
  const dispatch = useAppDispatch();
  const [whatDate, setWhatDate] = useState(0);
  const [dateStart, setDateStart] = useState(new Date());
  const [dateEnd, setDateEnd] = useState(moment().add('7', 'days').toDate());
  const orders = useAppSelector(selectOrder);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date: any) => {
    if (whatDate == 0) setDateStart(date);
    else setDateEnd(date);
    hideDatePicker();
  };
  useEffect(() => {
    dispatch(GetOrderByUserAction());
  }, []);

  if (orders.length == 0) {
    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.title}>Your Shopping cart is empty</Text>
        </View>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            marginTop: 20,
            marginBottom: 20,
          }}
        >
          <Image
            source={{
              uri: 'https://cdni.iconscout.com/illustration/premium/thumb/empty-cart-2130356-1800917.png',
            }}
            style={styles.imageLogoEmty}
          />
        </View>
        <Button
          title="Đi thuê ngay"
          buttonStyle={{ backgroundColor: mainColor }}
          containerStyle={{
            marginHorizontal: 50,
            marginVertical: 20,
            borderRadius: 15,
          }}
          titleStyle={{
            color: 'white',
            marginHorizontal: 20,
            fontSize: 20,
          }}
          onPress={() => {
            nav.navigate('ResultSearch', {});
          }}
        />
      </View>
    );
  }
  return (
    <ScrollView>
      <View>
        {orders.map((order, index) => (
          <View style={styles.store} key={index}>
            <TouchableOpacity onPress={() => nav.navigate('Store', { id: order.store.id })}>
              <View style={styles.store_infor}>
                <Image
                  style={styles.store_img}
                  source={{
                    uri: order.store.avatarURL || 'https://tse1.mm.bing.net/th?q=solo%20leveling%20manga%20rock',
                  }}
                />
                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{order.store.name}</Text>
                <MaterialIcons name="arrow-forward-ios" size={20} color="black" />
              </View>
            </TouchableOpacity>
            <View style={styles.store_list}>
              {order.orderDetails.map((e, i) => (
                <CardItem item={e} key={i} />
              ))}
            </View>
            <View>
              <View style={styles.dates}>
                <View style={styles.date}>
                  <Text style={styles.dateText}>Ngày mượn sách :</Text>
                  <Text style={{ flex: 1 }}>{moment(dateStart).format('DD/MM/YYYY')}</Text>
                  <TouchableOpacity
                    onPress={() => {
                      setWhatDate(0);
                      showDatePicker();
                    }}
                  >
                    <View style={styles.dateIcon}>
                      <FontAwesome5 name="calendar-alt" size={35} color={mainColor} />
                    </View>
                  </TouchableOpacity>
                </View>
                <View style={styles.date}>
                  <Text style={styles.dateText}>Ngày trả sách :</Text>
                  <Text style={{ flex: 1 }}>{moment(dateEnd).format('DD/MM/YYYY')}</Text>
                  <TouchableOpacity
                    onPress={() => {
                      setWhatDate(1);
                      showDatePicker();
                    }}
                  >
                    <View style={styles.dateIcon}>
                      <FontAwesome5 name="calendar-alt" size={35} color={mainColor} />
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
              <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
              />
              <View style={styles.price}>
                <Text style={{ marginRight: 10 }}>
                  Tổng thanh toán{' '}
                  <Text style={{ color: mainColor, fontWeight: '900', fontSize: 16 }}>
                    {moneyFormat(order.totalAmount)}
                  </Text>
                </Text>
                <TouchableOpacity>
                  <View style={styles.pay}>
                    <Text style={{ color: '#fff', fontSize: 17, fontWeight: 'bold' }}>Thuê truyện</Text>
                  </View>
                </TouchableOpacity>
              </View>
              <View>{/* <Text>selected: {date.toLocaleString()}</Text> */}</View>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
  // return (
  //   <View>
  //     <View style={styles.dates}>
  //       <View style={styles.date}>
  //         <Text>Ngày mượn sách</Text>
  //         <Text>10/07/2022</Text>
  //       </View>
  //     </View>
  //     <View style={styles.price}>
  //       <Text style={{ marginRight: 10 }}>
  //         Tổng thanh toán <Text style={{ color: mainColor, fontWeight: '900', fontSize: 16 }}>1,100,000</Text>
  //       </Text>
  //       <TouchableOpacity>
  //         <View style={styles.pay}>
  //           <Text style={{ color: '#fff', fontSize: 17, fontWeight: 'bold' }}>Thuê truyện</Text>
  //         </View>
  //       </TouchableOpacity>
  //     </View>
  //   </View>
  // );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
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
    marginHorizontal: 10,
    height: 40,
    width: 40,
    resizeMode: 'cover',
    borderRadius: 40 / 2,
  },
  itemInCart: {},
  store_list: {
    borderBottomWidth: 0.5,
    borderTopWidth: 0.2,
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