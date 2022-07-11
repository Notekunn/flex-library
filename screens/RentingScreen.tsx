import { Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { seconColor } from '../constants/Colors';
import { Button } from '@rneui/base';
import { RootStackScreenProps } from '../types';

const RentingBook = () => {
  return (
    <View style={styles.container}>
      <View style={styles.info}>
        <Image
          source={{
            uri: 'https://tse1.mm.bing.net/th?q=solo%20leveling%20manga%20rock',
          }}
          style={styles.imageLogoStore}
        />
        <View style={{ marginHorizontal: 15 }}>
          <Text style={styles.nameStore}>Wibu Store Book</Text>
          <View style={styles.infoDate}>
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ minWidth: 150 }}>Ngày thuê sách</Text>
              <Text style={styles.date}>10/07/2022</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ minWidth: 150 }}>Hạn trả sách</Text>
              <Text style={styles.date}>10/07/2022</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ minWidth: 150, color: '#E74C3C', fontWeight: 'bold' }}>Tổng thanh toán</Text>
              <Text style={{ color: '#E74C3C', fontWeight: 'bold' }}>1,000,000 VND</Text>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.action}>
        <Button
          title={'Chi Tiết'}
          containerStyle={{}}
          buttonStyle={{
            width: 100,
            height: 40,
            borderRadius: 15,
            backgroundColor: '#F1948A',
          }}
          //   onPress={btnCreateStore}
        />
        <Button
          title={'Trả sách'}
          containerStyle={{}}
          buttonStyle={{
            width: 100,
            height: 40,
            borderRadius: 15,
            backgroundColor: '#AF7AC5',
          }}
          //   onPress={btnCreateStore}
        />
        <Button
          title={'Gia hạn'}
          containerStyle={{}}
          buttonStyle={{
            width: 100,
            height: 40,
            borderRadius: 15,
            backgroundColor: '#58D68D',
          }}
          //   onPress={btnCreateStore}
        />
      </View>
    </View>
  );
};

export const RentingScreen: React.FC<RootStackScreenProps<'Renting'>> = () => {
  return (
    <View>
      <RentingBook />
      <RentingBook />
      <RentingBook />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: seconColor,
    height: 170,
    marginHorizontal: 20,
    borderRadius: 15,
    marginTop: 15,
  },
  imageLogoStore: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  info: {
    marginHorizontal: 15,
    marginTop: 10,
    flexDirection: 'row',
  },
  nameStore: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  action: {
    flexDirection: 'row',
    marginHorizontal: 15,
    marginTop: 10,
    justifyContent: 'space-between',
  },
  infoDate: {},
  date: {},
});
