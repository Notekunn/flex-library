import { CardField, useStripe, ConfirmPaymentResult } from '@stripe/stripe-react-native';
import { FC, useEffect, useMemo, useState } from 'react';
import { Alert, Button, Modal, View } from 'react-native';
import { useAppDispatch, useAppSelector } from '../../../app/hook';
import { CreatePaymentAction } from '../../../reducers/paymentSlice';
import { RootStackScreenProps } from '../../../types';

export const PaymentScreen: FC<RootStackScreenProps<'PaymentScreen'>> = ({ navigation, route }) => {
  const { item } = route.params;
  const { confirmPayment } = useStripe();
  const data = useAppSelector((state) => state.payment.data);
  const [clientSecret, setClientSecret] = useState('');
  const dispath = useAppDispatch();

  useEffect(() => {
    dispath(CreatePaymentAction({ amount: item.price, currency: 'usd', payment_method_types: ['card'] }));
  }, []);

  useMemo(() => {
    if (data) {
      setClientSecret(data.client_secret);
    }
  }, [data]);

  const pay = async () => {
    if (!clientSecret.length) {
      return Alert.alert('Error', 'Client secret is empty');
    }
    const { error, paymentIntent } = await confirmPayment(clientSecret, {
      type: 'Card',
    });
    if (error) {
      Alert.alert(`Error code: ${error.code}`, error.message);
    } else if (paymentIntent) {
      dispath(CreatePaymentAction({ amount: item.price, currency: 'usd', payment_method_types: ['card'] }));
      navigation.goBack();
    }
  };
  return (
    <View>
      <CardField
        postalCodeEnabled={true}
        placeholder={{
          number: '4242 4242 4242 4242',
        }}
        cardStyle={{
          backgroundColor: '#FFFFFF',
          textColor: '#000000',
        }}
        style={{
          width: '100%',
          height: 50,
          marginVertical: 30,
          display: 'flex',
          flexDirection: 'column',
        }}
      />

      <Button title="Pay" onPress={() => pay()} />
    </View>
  );
};
