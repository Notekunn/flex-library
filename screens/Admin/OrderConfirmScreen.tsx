import { View, Text } from '../../components/Themed';
import { RootStackScreenProps } from '../../types';

export const OrderConfirmScreen: React.FC<RootStackScreenProps<'OrderConfirm'>> = ({ navigation, route }) => {
  const { orderId } = route.params;
  return (
    <View>
      <Text>Order Confirm {orderId}</Text>
    </View>
  );
};
