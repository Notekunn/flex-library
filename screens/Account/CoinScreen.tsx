// import { Alert, Modal, StyleSheet, Text, View } from 'react-native';
// import { CardField, useStripe } from '@stripe/stripe-react-native';
// import React, { FC, useEffect, useMemo, useState } from 'react';
// import { Button } from '@rneui/base';
// import { useAppDispatch, useAppSelector } from '../../app/hook';
// import { CreatePaymentAction } from '../../reducers/paymentSlice';

// export const CoinScreen = () => {
//   const [modalVisible, setModalVisible] = useState(false);

//   const buy = async () => {
//     setModalVisible(true);
//   };

//   return (
//     <>
//       <Button onPress={buy} title="Buy" />
//       <PaymentScreen modalVisible={modalVisible} setModalVisible={setModalVisible} />
//     </>
//   );
// };

import { Image, FlatList, View, StyleSheet, Text, TouchableOpacity, Modal, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { IPackagePayment } from '../../constants/interface';
import { FC, useEffect, useState } from 'react';
import { Button } from '@rneui/themed';
import { CardField, useStripe } from '@stripe/stripe-react-native';
import { CreatePaymentAction } from '../../reducers/paymentSlice';
import { useAppDispatch, useAppSelector } from '../../app/hook';

interface IPayMentProps {
  modalVisible: boolean;
  setModalVisible: (value: boolean) => void;
}

const PaymentScreen: FC<IPayMentProps> = ({ modalVisible, setModalVisible }) => {
  const { confirmPayment } = useStripe();
  const data = useAppSelector((state) => state.payment.data);
  const [clientSecret, setClientSecret] = useState('');
  const dispath = useAppDispatch();

  useEffect(() => {
    dispath(CreatePaymentAction({ amount: 1000, currency: 'usd', payment_method_types: ['card'] }));
  }, [data]);

  useEffect(() => {
    if (data) {
      setClientSecret(data.client_secret || '');
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
      setModalVisible(false);
    }
  };
  return (
    <Modal
      animationType="slide"
      visible={modalVisible}
      style={{
        height: '50%',
        flex: 1,
      }}
    >
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
    </Modal>
  );
};

interface ICoinScreenProps {
  item: IPackagePayment;
  // modalVisible: boolean;
  setModalVisible: (value: boolean) => void;
}

const PackagePayment: FC<ICoinScreenProps> = ({ item, setModalVisible }) => {
  const buy = async () => {
    setModalVisible(true);
  };

  return (
    <TouchableOpacity style={styles.packagePayment} onPress={() => buy()}>
      <View style={styles.packageHeader}>
        <View style={styles.logo}>
          <Image
            source={{
              uri:
                item.avatarURL ||
                'https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png',
            }}
            style={{ width: '100%', height: '100%', resizeMode: 'contain', borderRadius: 10 }}
          />
        </View>
        <View style={styles.infoCompany}>
          <Text style={styles.namePackage}>{item.name}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export const CoinScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const ListPackagePayment: IPackagePayment[] = [
    {
      id: 1,
      name: '10$/100coin',
      avatarURL: 'https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png',
      coin: 100,
    },
    {
      id: 2,
      name: '100$/1100coin',
      avatarURL: 'https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png',
      coin: 100,
    },
    {
      id: 3,
      name: '1000$/11111coin',
      avatarURL: 'https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png',
      coin: 1000,
    },
  ];
  return (
    <View style={styles.container}>
      <View style={styles.body}>
        <FlatList
          data={ListPackagePayment}
          keyExtractor={(item, index) => item.name + index}
          renderItem={({ item, index }) => <PackagePayment item={item} key={index} setModalVisible={setModalVisible} />}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          onEndReachedThreshold={0.5}
        />
      </View>
      <PaymentScreen modalVisible={modalVisible} setModalVisible={setModalVisible} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000000',
  },
  packagePayment: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 12,
    boxShadow: '2px 4px 4px rgba(0, 0, 0, 0.25)',
    borderWidth: 0.25,
    borderColor: '#E5E5E5',
    minWidth: 250,
    marginRight: 10,
  },
  packageHeader: {
    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 4,
    // elevation: 5,
    display: 'flex',
    flexDirection: 'row',
  },
  namePackage: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000000',
  },
  infoCompany: {
    display: 'flex',
    flexDirection: 'column',
    paddingLeft: 10,
    justifyContent: 'space-around',
  },
  infoPackage: {
    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 4,
    // elevation: 5,
    marginTop: 10,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  text: {
    fontSize: 14,
    fontWeight: '400',
    color: '#6F6F6F',
    marginLeft: 5,
  },
  button: {
    marginTop: 10,
    borderRadius: 10,
  },
  logo: {
    width: 60,
    height: 60,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
    marginBottom: 10,
  },
  body: {
    marginTop: 15,
  },
});
