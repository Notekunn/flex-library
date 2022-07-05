import { Alert, StyleSheet, Text, TextInput, View } from 'react-native';
import React, { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { Button, Icon, Image } from '@rneui/themed';
import { mainColor } from '../../constants/Colors';
import { useNavigation, useRoute } from '@react-navigation/native';
import GoogleMap from '../../components/Map/GoogleMap';
import { useAppDispatch, useAppSelector } from '../../app/hook';
import { CreateStoreAction, selectLoading, selectMessage, UpdateStoreAction } from '../../reducers/storeSlice';

const ViewMyStoreScreen = () => {
  const dispatch = useAppDispatch();
  const mystore = useRoute<any>().params;
  const nav = useNavigation();
  const [name, setName] = useState('');
  const [editName, setEditName] = useState(false);
  const [address, setAddress] = useState('');
  const [editAddress, setEditAddress] = useState(false);

  const btnUpdateStore = () => {
    if (!name) {
      Alert.alert('Thông báo', 'Vui lòng nhập tên cửa hàng');
      return;
    }
    if (!address) {
      Alert.alert('Thông báo', 'Vui lòng nhập địa chỉ cửa hàng');
      return;
    }
    dispatch(
      UpdateStoreAction({
        id: mystore.id,
        name,
        address,
      }),
    );
    nav.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <GoogleMap
          region={{
            latitude: mystore.latitude,
            longitude: mystore.longitude,
          }}
        />
      </View>
      <View style={styles.body}>
        <View style={{ flexDirection: 'column', marginBottom: 5 }}>
          <Text style={styles.textTitle}>Tên cửa hàng</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', position: 'relative' }}>
            <TextInput
              style={{ backgroundColor: '#fbfbfb', padding: 10, borderRadius: 20, width: '100%' }}
              placeholder={mystore.name}
              editable={editName}
              onChangeText={(text) => setName(text)}
            />
            <View style={{ position: 'absolute', right: 10 }}>
              <Icon
                name="edit-2"
                type="feather"
                color={editName ? mainColor : ''}
                size={18}
                onPress={() => setEditName(!editName)}
              />
            </View>
          </View>
        </View>

        <View style={{ flexDirection: 'column', marginBottom: 5 }}>
          <Text style={styles.textTitle}>Địa chỉ</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', position: 'relative' }}>
            <TextInput
              style={{ backgroundColor: '#fbfbfb', padding: 10, borderRadius: 20, width: '100%' }}
              placeholder={mystore.address}
              editable={editAddress}
              onChangeText={(text) => setAddress(text)}
            />
            <View style={{ position: 'absolute', right: 10 }}>
              <Icon
                name="edit-2"
                type="feather"
                color={editAddress ? mainColor : ''}
                size={18}
                onPress={() => setEditAddress(!editAddress)}
              />
            </View>
          </View>
        </View>

        <View style={styles.groupButton}>
          <Button
            title={'Quay lại'}
            containerStyle={{
              width: 100,
              height: 40,
              borderRadius: 20,
            }}
            buttonStyle={{
              backgroundColor: mainColor,
            }}
            titleStyle={{
              color: '#fff',
            }}
            onPress={() => nav.goBack()}
          />
          <Button
            title={'Cập nhập'}
            containerStyle={{
              width: 100,
              height: 40,
              borderRadius: 20,
            }}
            buttonStyle={{
              backgroundColor: '#faad14',
            }}
            onPress={() => btnUpdateStore()}
          />
        </View>
      </View>
    </View>
  );
};

export default ViewMyStoreScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  header: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1.25,
  },
  name: {
    fontSize: 18,
    color: '#FFF',
    textTransform: 'capitalize',
    fontFamily: 'SansPro',
  },

  body: {
    flex: 3,
    flexDirection: 'column',
    backgroundColor: '#fff',
    width: '100%',
    padding: 40,
  },
  textTitle: {
    fontSize: 18,
    color: mainColor,
    fontFamily: 'SansPro',
    marginBottom: 5,
  },
  groupButton: {
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});
