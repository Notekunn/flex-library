import { StyleSheet, Text, TextInput, View } from 'react-native';
import React, { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { Button, Image } from '@rneui/themed';
import { mainColor } from '../../constants/Colors';
import { useNavigation } from '@react-navigation/native';
import GoogleMap from '../../components/Map/GoogleMap';
import { useAppDispatch, useAppSelector } from '../../app/hook';
import { CreateStoreAction, selectData, selectLoading, selectMessage } from '../../reducers/storeSlice';

const CreateStoreScreen = () => {
  const dispatch = useAppDispatch();
  const nav = useNavigation();
  const error = useAppSelector(selectMessage);
  const loading = useAppSelector(selectLoading);
  const data = useAppSelector(selectData);
  const [name, setName] = useState('');
  const [errorName, setErrorName] = useState('');
  const [address, setAddress] = useState('');
  const [errorAddress, setErrorAddress] = useState('');
  const [image, setImage] = useState('https://bloganchoi.com/wp-content/uploads/2021/08/avatar-vit-vang-trend-15.jpg');
  const uploadImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

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
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <GoogleMap />
      </View>
      <View style={styles.body}>
        <View>
          <View style={{ flexDirection: 'column', marginBottom: 5 }}>
            <Text style={styles.textTitle}>Name</Text>
            <TextInput
              style={{ backgroundColor: '#fbfbfb', padding: 10, borderRadius: 20 }}
              placeholder="Name Store"
              onChangeText={(text) => setName(text)}
            />
          </View>
          <View style={{ flexDirection: 'column', marginBottom: 5 }}>
            <Text style={styles.textTitle}>Address</Text>
            <TextInput
              style={{ backgroundColor: '#fbfbfb', padding: 10, borderRadius: 20 }}
              placeholder="Address Store Of Your Store"
              onChangeText={(text) => setAddress(text)}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginBottom: 5,
              alignItems: 'center',
              marginTop: 10,
              justifyContent: 'flex-end',
            }}
          >
            <Image
              source={{ uri: image }}
              style={{
                width: 55,
                height: 55,
                borderColor: mainColor,
                borderWidth: 0.5,
                marginRight: 10,
                resizeMode: 'stretch',
              }}
            />
            <Button
              title={'Choose Image'}
              containerStyle={{ borderRadius: 20 }}
              onPress={uploadImage}
              titleStyle={{
                fontSize: 10,
                padding: 0,
              }}
              buttonStyle={{
                backgroundColor: '#faad14',
              }}
            />
          </View>
        </View>
        <View style={styles.groupButton}>
          <Button
            title={'Back'}
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
            title={'Create'}
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
