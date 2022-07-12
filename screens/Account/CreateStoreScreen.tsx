import { StyleSheet, Text, TextInput, View } from 'react-native';
import React, { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { Button, Image } from '@rneui/themed';
import { mainColor } from '../../constants/Colors';
import { useNavigation } from '@react-navigation/native';
import GoogleMap from '../../components/Map/GoogleMap';
import { useAppDispatch, useAppSelector } from '../../app/hook';
import { CreateStoreAction } from '../../reducers/storeSlice';
import { selectOwnStore } from '../../reducers/authSlice';

const CreateStoreScreen = () => {
  const dispatch = useAppDispatch();
  const nav = useNavigation();
  const ownStore = useAppSelector(selectOwnStore);
  const [name, setName] = useState('');
  const [editName, setEditName] = useState(false);
  const [address, setAddress] = useState('');
  const [editAddress, setEditAddress] = useState(false);

  const btnCreateStore = async () => {
    dispatch(
      CreateStoreAction({
        name,
        address,
        latitude: 20.980194953622984,
        longitude: 105.79615346430842,
        provinceId: 1,
      }),
    );
  };

  if (ownStore) {
    nav.navigate('Home');
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <GoogleMap
          region={{
            latitude: 20.980194953622984,
            longitude: 105.79615346430842,
          }}
        />
      </View>
      <View style={styles.body}>
        <View>
          <View style={{ flexDirection: 'column', marginBottom: 5 }}>
            <Text style={styles.textTitle}>Tên cửa hàng</Text>
            <TextInput
              style={{ backgroundColor: '#fbfbfb', padding: 10, borderRadius: 20 }}
              placeholder="Nhập tên cửa hàng"
              onChangeText={(text) => setName(text)}
            />
          </View>
          <View style={{ flexDirection: 'column', marginBottom: 5 }}>
            <Text style={styles.textTitle}>Địa chỉ</Text>
            <TextInput
              style={{ backgroundColor: '#fbfbfb', padding: 10, borderRadius: 20 }}
              placeholder="Nhập địa chỉ của bạn"
              onChangeText={(text) => setAddress(text)}
            />
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
            title={'Tạo'}
            containerStyle={{
              width: 100,
              height: 40,
              borderRadius: 20,
            }}
            buttonStyle={{
              backgroundColor: '#faad14',
            }}
            onPress={btnCreateStore}
          />
        </View>
      </View>
    </View>
  );
};

export default CreateStoreScreen;

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
