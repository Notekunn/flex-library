import { Dimensions, StyleSheet, Text, View, Image } from 'react-native';
import React from 'react';
import { RootStackScreenProps, RootTabScreenProps } from '../types';
import { ScrollView } from 'react-native-gesture-handler';
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import { stringLength } from '@firebase/util';

const listImage = [
  'https://tuoitho.mobi/upload/truyen/tham-tu-lung-danh-conan-tap-1/anh-bia.jpg',
  'https://tuoitho.mobi/upload/truyen/tham-tu-lung-danh-conan-tap-2/anh-bia.jpg',
  'https://tuoitho.mobi/upload/truyen/tham-tu-lung-danh-conan-tap-3/anh-bia.jpg',
  'https://tuoitho.mobi/upload/truyen/tham-tu-lung-danh-conan-tap-4/anh-bia.jpg',
  'https://tuoitho.mobi/upload/truyen/tham-tu-lung-danh-conan-tap-5/anh-bia.jpg',
];
const { width } = Dimensions.get('window');

const ItemScreen = ({ navigation }: RootStackScreenProps<'Item'>) => {
  return (
    <View style={styles.container}>
      <ScrollView>
        <View>
          <Image style={styles.image} source={{ uri: listImage[0] }} />
        </View>
        <View style={styles.desc}>
          <Text style={styles.title}>
            Truyện tranh Connan version VIP pro MAX ULTRA WIDE
          </Text>
          <Text style={styles.price}>395.000đ</Text>
          <View style={styles.extensions}>
            <View style={styles.rate}>
              <AntDesign name='star' size={17} color='yellow' />
              <AntDesign name='star' size={17} color='yellow' />
              <AntDesign name='star' size={17} color='yellow' />
              <AntDesign name='star' size={17} color='yellow' />
              <AntDesign name='star' size={17} color='yellow' />
              <Text style={{ paddingLeft: 7, fontSize: 15 }}>5</Text>
            </View>
            <View style={styles.border}></View>
            <Text style={{ fontSize: 15 }}>Đã bán 2605</Text>
            <View style={styles.action}>
              <AntDesign name='hearto' size={25} color='gray' />
              <MaterialCommunityIcons
                style={{ marginLeft: 10 }}
                name='share-outline'
                size={35}
                color='gray'
              />
              <MaterialCommunityIcons
                style={{ marginLeft: 10 }}
                name='facebook-messenger'
                size={25}
                color='blue'
              />
            </View>
          </View>
        </View>
        <View style={styles.store}>
          <View style={styles.store_header}>
            <Image
              style={{
                height: 60,
                width: 60,
                resizeMode: 'contain',
                borderRadius: 30,
              }}
              source={{ uri: listImage[1] }}
            />
            <View style={styles.text}>
              <Text style={{ fontSize: 20 }}>FlexLib.vip.vn</Text>
              <Text style={{ fontSize: 12, color: 'gray' }}>
                Online 11 giờ trước
              </Text>
            </View>
            <View style={styles.button}>
              <Text style={{ color: '#4C4CD7' }}>Xem Shop</Text>
            </View>
          </View>
          <View style={styles.store_bottom}>
            <View style={{ flexDirection: 'row', marginRight: 10 }}>
              <Text style={{ color: '#4C4CD7' }}>2,6k</Text>
              <Text>Sản phẩm</Text>
            </View>
            <View style={{ flexDirection: 'row', marginRight: 10 }}>
              <Text style={{ color: '#4C4CD7' }}>4,9</Text>
              <Text>Đánh giá</Text>
            </View>
            <View style={{ flexDirection: 'row', marginRight: 10 }}>
              <Text style={{ color: '#4C4CD7' }}>99%</Text>
              <Text>Phản hồi Chat</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default ItemScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  image: {
    height: 400,
    width: width,
    resizeMode: 'contain',
  },
  title: {
    alignSelf: 'flex-start',
    fontSize: 23,
  },
  price: {
    alignSelf: 'flex-start',
    fontSize: 25,
    color: '#E74C3C',
    marginTop: 10,
  },
  extensions: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  rate: { flexDirection: 'row', alignItems: 'center' },
  border: {
    width: 1,
    height: 16,
    borderRightWidth: 1,
    marginHorizontal: 7,
  },
  action: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  desc: {
    backgroundColor: '#FADBD8',
    borderRadius: 10,
    marginHorizontal: 10,
    marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  store: {
    flexDirection: 'column',
    // alignItems: 'center',
    backgroundColor: '#FADBD8',
    borderRadius: 10,
    marginHorizontal: 10,
    marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  text: {
    flex: 1,
    fontSize: 20,
  },
  button: {
    borderWidth: 2,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
    borderColor: '#4C4CD7',
    borderRadius: 4,
  },
  store_header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  store_bottom: {
    flexDirection: 'row',
    marginTop: 10,
  },
});
