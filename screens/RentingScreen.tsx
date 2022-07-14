import { Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { seconColor } from '../constants/Colors';
import { Button } from '@rneui/base';
import { RootStackScreenProps } from '../types';
import { useAppDispatch, useAppSelector } from '../app/hook';
import { returnAction, selectLoading, selectLoans } from '../reducers/loanSlice';
import SplashScreen from './SplashScreen';
import { IBookLoanResponse } from '../constants/interface';
import moment from 'moment';
import { BookStatus, ReturnBookType } from '../constants/enum';
import { moneyFormat } from '../constants/Money';

interface RentingBookProps {
  loan: IBookLoanResponse;
  onReturn: () => void;
  onLost: () => void;
}
const RentingBook: React.FC<RentingBookProps> = ({ loan, onReturn, onLost }) => {
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
          <Text style={styles.nameStore}>{loan?.bookCopy?.barcode}</Text>
          <View style={styles.infoDate}>
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ minWidth: 150 }}>Ngày thuê sách</Text>
              <Text style={styles.date}>{moment(loan.createdAt).format('DD/MM/YYYY')}</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ minWidth: 150 }}>Hạn trả sách</Text>
              <Text style={styles.date}>{moment(loan.dueDate).format('DD/MM/YYYY')}</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ minWidth: 150, fontWeight: 'bold' }}>Tổng thanh toán</Text>
              <Text style={{ color: '#E74C3C', fontWeight: 'bold' }}>{moneyFormat(loan.order.totalAmount)}</Text>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.action}>
        <Button
          title={'Trả sách'}
          containerStyle={{}}
          buttonStyle={{
            width: 100,
            height: 40,
            borderRadius: 15,
            backgroundColor: '#AF7AC5',
          }}
          onPress={onReturn}
        />
        {/* <Button
          title={'Gia hạn'}
          containerStyle={{}}
          buttonStyle={{
            width: 100,
            height: 40,
            borderRadius: 15,
            backgroundColor: '#58D68D',
          }}
        /> */}

        <Button
          title="Báo mất"
          containerStyle={{}}
          buttonStyle={{
            width: 100,
            height: 40,
            borderRadius: 15,
            backgroundColor: '#58D68D',
          }}
          onPress={onLost}
        />
      </View>
    </View>
  );
};

export const RentingScreen: React.FC<RootStackScreenProps<'Renting'>> = () => {
  const loans = useAppSelector(selectLoans);
  const loading = useAppSelector(selectLoading);
  const dispatch = useAppDispatch();
  if (loading == 'loading') {
    return <SplashScreen />;
  }
  return (
    <View>
      {loans.length == 0 && (
        <View style={styles.container}>
          <View>
            <Text style={styles.title}>Giỏ hàng bạn trống</Text>
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
          {/* <Button
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
            /> */}
        </View>
      )}
      {loans.map((loan) => (
        <RentingBook
          loan={loan}
          onReturn={() =>
            dispatch(
              returnAction({
                barcode: loan?.bookCopy?.barcode,
                status: ReturnBookType.RETURN,
              }),
            )
          }
          onLost={() =>
            dispatch(
              returnAction({
                barcode: loan?.bookCopy?.barcode,
                status: ReturnBookType.LOST,
              }),
            )
          }
        />
      ))}
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
  date: {
    fontWeight: 'bold',
  },
  expiredDate: {
    color: '#E74C3C',
  },
  emptyText: {
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 20,
    fontWeight: 'bold',
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
});
