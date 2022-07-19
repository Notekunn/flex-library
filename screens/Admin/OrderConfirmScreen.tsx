import { Button } from '@rneui/base';
import { useEffect } from 'react';
import { Image, ScrollView, StyleSheet } from 'react-native';
import Toast from 'react-native-root-toast';
import { useAppDispatch, useAppSelector } from '../../app/hook';
import { View, Text } from '../../components/Themed';
import { mainColor, seconColor } from '../../constants/Colors';
import { OrderStatus } from '../../constants/enum';
import { IBook, IResponseOrderDetail } from '../../constants/interface';
import { moneyFormat } from '../../constants/Money';
import {
  confirmOrderAction,
  denyOrderAction,
  getOrderLoanAction,
  selectLoading,
  selectOrderLoans,
} from '../../reducers/loanSlice';
import { RootStackScreenProps } from '../../types';
interface BookItemProps {
  orderDetail: IResponseOrderDetail;
}
const BookItem: React.FC<BookItemProps> = ({ orderDetail }) => {
  return (
    <View style={{ flexDirection: 'row', marginBottom: 10 }}>
      <View>
        <Image
          source={{
            uri: orderDetail?.book?.images?.[0] || 'https://tse1.mm.bing.net/th?q=solo%20leveling%20manga%20rock',
          }}
          style={styles.imageBook}
        />
      </View>
      <View style={{ marginTop: 10, marginHorizontal: 10 }}>
        <Text>{orderDetail?.book?.name}</Text>
        <Text>{moneyFormat(orderDetail?.book?.rentPrice || 0)} / 1 tuần</Text>
        <Text>Barcode: {orderDetail?.book?.barcode}</Text>
      </View>
      <View
        style={{ justifyContent: 'flex-end', alignItems: 'center', flex: 1, flexDirection: 'row', paddingRight: 25 }}
      >
        <View
          style={{
            backgroundColor: '#58D68D',
            height: 30,
            width: 30,
            borderRadius: 15,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text style={{ color: '#fff', fontSize: 25, fontWeight: 'bold' }}>{orderDetail?.quantity}</Text>
        </View>
      </View>
    </View>
  );
};
export const OrderConfirmScreen: React.FC<RootStackScreenProps<'OrderConfirm'>> = ({ navigation, route }) => {
  const { orderId } = route.params;
  const orderLoan = useAppSelector(selectOrderLoans);
  const countBook =
    orderLoan?.order?.orderDetails?.reduce((prev, orderDetail) => {
      return prev + orderDetail.quantity;
    }, 0) || 0;

  // const loading = useAppSelector(selectLoading);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getOrderLoanAction(orderId));
  }, [orderId]);

  // if (orderLoan && orderLoan?.order.status !== OrderStatus.PURCHASED) {
  //   Toast.show('Đơn hàng chưa được thanh toán');
  //   navigation.goBack();

  //   return null;
  // }
  return (
    <View style={{ paddingHorizontal: 10, flex: 1 }}>
      <View style={{ marginBottom: 10, overflow: 'hidden' }}>
        <View style={{ justifyContent: 'center', alignItems: 'center', marginVertical: 15 }}>
          <Image
            source={{
              uri: orderLoan?.order?.user?.avatar || 'https://tse1.mm.bing.net/th?q=solo%20leveling%20manga%20rock',
            }}
            style={styles.avatar}
          />
        </View>
        <View style={{ backgroundColor: seconColor }}>
          <View style={styles.textForm}>
            <Text style={{ ...styles.text, minWidth: 250, paddingBottom: 7 }}>Tên khách hàng </Text>
            <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'flex-end' }}>
              <Text style={styles.text}>{orderLoan?.order?.user?.name}</Text>
            </View>
          </View>
          <View style={styles.textForm}>
            <Text style={{ ...styles.text, minWidth: 250, paddingBottom: 7 }}>Order Confirm </Text>
            <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'flex-end' }}>
              <Text style={styles.text}>{orderId}</Text>
            </View>
          </View>
          <View style={styles.textForm}>
            <Text style={{ ...styles.text, minWidth: 250, paddingBottom: 7 }}>Trạng thái </Text>
            <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'flex-end' }}>
              <View
                style={{
                  backgroundColor: mainColor,
                  paddingHorizontal: 10,
                  borderRadius: 5,
                  paddingVertical: 5,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Text
                  style={{
                    ...styles.text,
                    color: '#fff',
                  }}
                >
                  {orderLoan?.order?.status}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
      <ScrollView style={{ height: 400, flexGrow: 0 }}>
        <View>
          {orderLoan?.order?.orderDetails?.map((orderDetail) => (
            <BookItem orderDetail={orderDetail} />
          ))}
        </View>
      </ScrollView>
      <View style={styles.footer}>
        <View style={styles.textForm}>
          <Text style={{ ...styles.text, minWidth: 250, paddingBottom: 7 }}>Tổng số quyển sách </Text>
          <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'flex-end' }}>
            <Text style={styles.text}>{countBook}</Text>
          </View>
        </View>
        <View style={styles.textForm}>
          <Text style={{ ...styles.text, minWidth: 250, paddingBottom: 7 }}>Tổng số tiền </Text>
          <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'flex-end' }}>
            <Text style={styles.text}>{moneyFormat(orderLoan?.order?.totalAmount || 0)}</Text>
          </View>
        </View>
        <View style={styles.formBtn}>
          <Button
            buttonStyle={{ ...styles.btn, backgroundColor: '#58D68D', borderRadius: 10 }}
            title="Xác nhận đơn hàng"
            onPress={() => orderId && dispatch(confirmOrderAction(orderId))}
            disabled={orderLoan?.order?.status !== OrderStatus.PURCHASED}
          />
          <Button
            buttonStyle={{ ...styles.btn, backgroundColor: '#E74C3C', borderRadius: 10 }}
            title="Huỷ đơn hàng"
            onPress={() => orderId && dispatch(denyOrderAction(orderId))}
            disabled={orderLoan?.order?.status !== OrderStatus.PURCHASED}
          />
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  avatar: {
    height: 150,
    width: 150,
    borderRadius: 75,
  },
  textForm: {
    flexDirection: 'row',
  },
  text: {
    fontSize: 20,
  },
  imageBook: {
    height: 70,
    width: 70,
    borderRadius: 35,
  },
  btn: {
    width: 170,
  },
  formBtn: {
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    flex: 1,
  },
  footer: {
    flex: 1,
  },
});
