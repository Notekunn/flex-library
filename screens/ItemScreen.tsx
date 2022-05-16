import { Dimensions, StyleSheet, Text, View, Image } from 'react-native';
import React from 'react';
import { RootStackScreenProps, RootTabScreenProps } from '../types';
import { ScrollView } from 'react-native-gesture-handler';

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
        <Text style={styles.title}>
          Truyện tranh Connan version VIP pro MAX ULTRA WIDE
        </Text>
        <Text style={styles.price}>395.000đ</Text>
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
    marginTop: 10,
    paddingHorizontal: 15,
  },
  price: {
    alignSelf: 'flex-start',
    fontSize: 25,
    paddingHorizontal: 15,
    color: '#E74C3C',
    marginTop: 10,
  },
});
