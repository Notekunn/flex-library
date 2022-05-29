import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import React from 'react';
import { Button, Icon, ListItem } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import { mainColor } from '../constants/Colors';
import { TouchableOpacity } from 'react-native-gesture-handler';

const ItemInCart = () => (
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
          <View style={styles.info}>
            <Image
              source={{
                uri: 'https://tuoitho.mobi/upload/truyen/tham-tu-lung-danh-conan-tap-1/anh-bia.jpg',
              }}
              style={styles.image}
            />
            <View style={styles.detail}>
              <Text style={[styles.text, { color: '#000', marginBottom: 10, fontWeight: '600', fontSize: 17 }]}>
                truyen conan tap 1
              </Text>
              <Text style={styles.text}>$3000</Text>
            </View>
          </View>
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

            <Text style={{ margin: 10, fontSize: 20 }}>1</Text>
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
const CartScreen = () => {
  const nav = useNavigation();
  return (
    // chưa có data
    // <View style={styles.container}>
    //     <View>
    //         <Text style={styles.title}>Your Shopping cart is empty</Text>
    //     </View>
    //     <View
    //         style={{
    //             alignItems: 'center',
    //             justifyContent: 'center',
    //             width: '100%',
    //             marginTop: 20,
    //             marginBottom: 20,
    //         }}
    //     >
    //         <Image
    //             source={{
    //                 uri: 'https://cdni.iconscout.com/illustration/premium/thumb/empty-cart-2130356-1800917.png',
    //             }}
    //             style={styles.imageLogoEmty}
    //         />
    //     </View>
    //     <Button
    //         title="Shoping now"
    //         buttonStyle={{ backgroundColor: '#f84b2f' }}
    //         containerStyle={{
    //             marginHorizontal: 50,
    //             marginVertical: 20,
    //             borderRadius: 15,
    //         }}
    //         titleStyle={{
    //             color: 'white',
    //             marginHorizontal: 20,
    //             fontSize: 20,
    //         }}
    //         onPress={() => {
    //             nav.navigate('Home');
    //         }}
    //     />
    // </View>
    //có data

    <ScrollView>
      <View style={styles.store}>
        <TouchableOpacity onPress={() => nav.navigate('Store')}>
          <View style={styles.store_infor}>
            <Image
              style={styles.store_img}
              source={{ uri: 'https://tse1.mm.bing.net/th?q=solo%20leveling%20manga%20rock' }}
            />
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>SPY Library</Text>
            <MaterialIcons name="arrow-forward-ios" size={20} color="black" />
          </View>
        </TouchableOpacity>
        <View style={styles.store_list}>
          <ItemInCart />
          <ItemInCart />
        </View>
        <View style={styles.price}>
          <Text style={{ marginRight: 10 }}>
            Tổng thanh toán <Text style={{ color: mainColor, fontWeight: '900', fontSize: 16 }}>26.500 đ</Text>
          </Text>
          <TouchableOpacity>
            <View style={styles.pay}>
              <Text style={{ color: '#fff', fontSize: 17, fontWeight: 'bold' }}>Thuê truyện</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.store}>
        <TouchableOpacity onPress={() => nav.navigate('Store')}>
          <View style={styles.store_infor}>
            <Image
              style={styles.store_img}
              source={{
                uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBHluYKcqYORBaNCxuK676aCNlaUw1pAtn1V7lPocfiGD9k7lphgKJigDR1efV1DlS0jI&usqp=CAU',
              }}
            />
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>KMA Library</Text>
            <MaterialIcons name="arrow-forward-ios" size={20} color="black" />
          </View>
        </TouchableOpacity>
        <View style={styles.store_list}>
          <ItemInCart />
          <ItemInCart />
        </View>
        <View style={styles.price}>
          <Text style={{ marginRight: 10 }}>
            Tổng thanh toán <Text style={{ color: mainColor, fontWeight: '900', fontSize: 16 }}>26.500 đ</Text>
          </Text>
          <TouchableOpacity>
            <View style={styles.pay}>
              <Text style={{ color: '#fff', fontSize: 17, fontWeight: 'bold' }}>Thuê truyện</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
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
    fontSize: 15,
    color: mainColor,
    fontWeight: '500',
    textTransform: 'capitalize',
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
    flexWrap: 'wrap',
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
