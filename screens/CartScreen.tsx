import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native';
import React, { useEffect } from 'react';
import { Button, Icon, ListItem } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import { mainColor } from '../constants/Colors';
import { useAppDispatch, useAppSelector } from '../app/hook';
import { GetOrderByUserAction, OrderDetailResponse, selectOrder } from '../reducers/orderSlice';
import { moneyFormat } from '../constants/Money';

interface IItemCarProps {
  item: OrderDetailResponse;
}
const CardItem: React.FC<IItemCarProps> = ({ item }) => {
  const nav = useNavigation<any>();
  return (
    <View style={styles.itemInCart}>
      <ListItem.Swipeable
        leftContent={(reset) => (
          <Button
            title="Info"
            onPress={() => reset()}
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
            <TouchableOpacity onPress={() => nav.push('Item', item.book)}>
              <View style={styles.info}>
                <Image
                  source={{
                    uri:
                      item.book.images.shift() ||
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
              />
              <Text style={{ margin: 10, fontSize: 20 }}>{item.quantity}</Text>
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
              />
            </View>
          </View>
        </ListItem.Content>
      </ListItem.Swipeable>
    </View>
  );
};
const CartScreen = () => {
  const nav = useNavigation<any>();
  const dispatch = useAppDispatch();
  const orders = useAppSelector(selectOrder);
  useEffect(() => {
    dispatch(GetOrderByUserAction());
  }, []);

  if (!orders) {
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
            nav.navigate('Home');
          }}
        />
      </View>
    );
  }
  return (
    <ScrollView>
      {orders.map((item, index: number) => (
        <View style={styles.store} key={index}>
          <TouchableOpacity onPress={() => nav.navigate('Store', item.store)}>
            <View style={styles.store_infor}>
              <Image
                style={styles.store_img}
                source={{ uri: 'https://tse1.mm.bing.net/th?q=solo%20leveling%20manga%20rock' }}
              />
              <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{item.store.name}</Text>
              <MaterialIcons name="arrow-forward-ios" size={20} color="black" />
            </View>
          </TouchableOpacity>
          <View style={styles.store_list}>
            {item.orderDetails.map((e: any, i: number) => (
              <CardItem item={e} key={i} />
            ))}
          </View>
          <View style={styles.price}>
            <Text style={{ marginRight: 10 }}>
              Tổng thanh toán{' '}
              <Text style={{ color: mainColor, fontWeight: '900', fontSize: 16 }}>{moneyFormat(item.totalAmount)}</Text>
            </Text>
            <TouchableOpacity>
              <View style={styles.pay}>
                <Text style={{ color: '#fff', fontSize: 17, fontWeight: 'bold' }}>Thuê truyện</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

export default CartScreen;

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
});
