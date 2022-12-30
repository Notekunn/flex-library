import { Image, FlatList, View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { IPaymentPackage } from '../../../constants/interface';
import { FC, useEffect, useMemo, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hook';
import { GetAllPaymentPackagesAction } from '../../../reducers/paymentPackageSlice';

interface ICoinScreenProps {
  item: IPaymentPackage;
}

const PackagePayment: FC<ICoinScreenProps> = ({ item }) => {
  const nav = useNavigation();
  return (
    <TouchableOpacity style={styles.packagePayment} onPress={() => nav.navigate('PaymentScreen', { item })}>
      <View style={styles.packageHeader}>
        <View style={styles.logo}>
          <Image
            source={{
              uri:
                item.imageUrl ||
                'https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png',
            }}
            style={{ width: '100%', height: '100%', resizeMode: 'contain', borderRadius: 10 }}
          />
        </View>
        <View style={styles.infoCompany}>
          <Text style={styles.namePackage}>{item.name}</Text>
          <Text style={styles.text}>{`${item.coin} coin / ${item.price} $ `}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export const CoinScreen = () => {
  const data = useAppSelector((state) => state.paymentPackage.data);
  const dispath = useAppDispatch();
  const [listPackagePayment, setListPackagePayment] = useState<IPaymentPackage[]>([]);

  useEffect(() => {
    dispath(GetAllPaymentPackagesAction());
  }, []);

  useMemo(() => {
    if (data) {
      setListPackagePayment(data);
    }
  }, [data]);
  return (
    <View style={styles.container}>
      <View style={styles.body}>
        <FlatList
          data={listPackagePayment}
          keyExtractor={(item, index) => item.name + index}
          renderItem={({ item, index }) => <PackagePayment item={item} key={index} />}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          onEndReachedThreshold={0.5}
        />
      </View>
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
