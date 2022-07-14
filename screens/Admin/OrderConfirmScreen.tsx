import { Button } from '@rneui/base';
import { useEffect } from 'react';
import Toast from 'react-native-root-toast';
import { useAppDispatch, useAppSelector } from '../../app/hook';
import { View, Text } from '../../components/Themed';
import { OrderStatus } from '../../constants/enum';
import {
  confirmOrderAction,
  denyOrderAction,
  getOrderLoanAction,
  selectLoading,
  selectOrderLoans,
} from '../../reducers/loanSlice';
import { RootStackScreenProps } from '../../types';

export const OrderConfirmScreen: React.FC<RootStackScreenProps<'OrderConfirm'>> = ({ navigation, route }) => {
  const { orderId } = route.params;
  const orderLoan = useAppSelector(selectOrderLoans);
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
    <View>
      <Text>Order Confirm {orderId}</Text>
      <Text>Trạng thái: {orderLoan?.order?.status}</Text>
      {orderLoan?.bookLoans?.map((loan) => (
        <Text>Barcode: {loan.bookCopy.barcode}</Text>
      ))}
      <Button title="Xác nhận đơn hàng" onPress={() => orderId && dispatch(confirmOrderAction(orderId))} />
      <Button title="Huỷ đơn hàng" onPress={() => orderId && dispatch(denyOrderAction(orderId))} />
    </View>
  );
};
