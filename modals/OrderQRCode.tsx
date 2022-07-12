import { StyleSheet, Text, View, Image, Dimensions } from 'react-native';
import React from 'react';
import QRCode from 'react-native-qrcode-svg';
import { RootStackScreenProps } from '../types';

const { width } = Dimensions.get('window');

export const OrderQRCodeModal: React.FC<RootStackScreenProps<'OrderQRCodeModal'>> = ({ route }) => {
  const { orderId } = route.params;
  return (
    <View style={styles.container}>
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <Text
          style={{
            fontSize: 20,
            marginVertical: 20,
            color: '#fff',
            fontWeight: 'bold',
          }}
        >
          Vui lòng đưa mã QR cho nhân viên
        </Text>
        <QRCode value={`flex-library:confirm-order:${orderId}`} size={250} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4C4CD7',
  },
  image: {
    height: 250,
    width: width,
    resizeMode: 'contain',
  },
});
