import { View, StyleSheet, Image, Text } from 'react-native';
import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hook';
import { Button, Input } from '@rneui/themed';
import { mainColor } from '../../constants/Colors';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';
import { registerAction, selectError, selectLoading } from '../../reducers/authSlice';
import { cloudinaryConfig, makeUploadFormData, uploadImage } from '../../app/cloudinary';
export default function SignUpScreen() {
  const nav = useNavigation();
  const [name, setName] = useState('');
  const [errorName, setErrorName] = useState('');
  const [email, setEmail] = useState('');
  const [errorEmail, setErrorEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorPassword, setErrorPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorConfirmPassword, setErrorConfirmPassword] = useState('');
  const [avatar, setAvatar] = useState(
    'https://bloganchoi.com/wp-content/uploads/2021/08/avatar-vit-vang-trend-15.jpg',
  );

  const dispatch = useAppDispatch();
  const error = useAppSelector(selectError);
  const loading = useAppSelector(selectLoading);
  const upLoadAvatar = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
      base64: true,
    });

    if (!result.cancelled) {
      const { secure_url } = await uploadImage(result);
      setAvatar(secure_url);
    }
  };
  const handleSubmit = () => {
    setErrorName('');
    setErrorEmail('');
    setErrorPassword('');
    setErrorConfirmPassword('');
    if (name.length === 0) {
      setErrorName('Name is required');
      return;
    }
    if (email.length === 0) {
      setErrorEmail('Email is required');
      return;
    }
    if (password.length === 0) {
      setErrorPassword('Password is required');
      return;
    }
    if (password !== confirmPassword && password.length > 0) {
      setErrorConfirmPassword('Confirm password is not match');
      return;
    }
    dispatch(
      registerAction({
        email,
        password,
        name,
        avatar,
      }),
    );
  };
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>SignUp</Text>
      </View>
      <View style={styles.form}>
        <Input
          placeholder="Name"
          onChangeText={(text) => setName(text)}
          inputStyle={{ color: '#FFF', height: 50 }}
          autoFocus={true}
          errorMessage={errorName}
        />
        <Input
          placeholder="Email"
          onChangeText={(text) => setEmail(text)}
          inputStyle={{ color: '#FFF', height: 50 }}
          autoCapitalize="none"
          errorMessage={errorEmail}
        />
        <Input
          placeholder="Password"
          secureTextEntry={true}
          onChangeText={(text) => setPassword(text)}
          inputStyle={{ color: '#FFF', height: 50 }}
          errorMessage={errorPassword}
        />
        <Input
          placeholder="Confirm Password"
          secureTextEntry={true}
          onChangeText={(text) => setConfirmPassword(text)}
          autoFocus={true}
          inputStyle={{ color: '#FFF', height: 50 }}
          pointerEvents="none"
          errorMessage={errorConfirmPassword}
        />
        <View style={styles.formImage}>
          <Button
            title="Upload Image"
            onPress={upLoadAvatar}
            buttonStyle={{
              backgroundColor: '#faad14',
              borderRadius: 15,
              width: 100,
            }}
            titleStyle={{ fontSize: 12, fontFamily: 'SansPro' }}
          ></Button>
          <Image
            source={{
              uri: avatar,
            }}
            style={{
              alignSelf: 'center',
              justifyContent: 'center',
              width: 50,
              height: 50,
              resizeMode: 'contain',
              marginLeft: 10,
              borderColor: '#faad14',
              borderWidth: 1,
            }}
          />
        </View>
      </View>
      <View style={styles.groupBtn}>
        <Button
          title="Cancel"
          loading={false}
          loadingProps={{ size: 'small', color: 'white' }}
          buttonStyle={{
            backgroundColor: '#db0f34',
            borderRadius: 60,
            height: 45,
            width: 150,
          }}
          onPress={() => nav.goBack()}
        />
        <Button
          title="Submit"
          onPress={handleSubmit}
          loading={loading === 'loading'}
          loadingProps={{ size: 'small', color: 'white' }}
          buttonStyle={{
            backgroundColor: 'rgba(111, 202, 186, 1)',
            borderRadius: 60,
            height: 45,
            width: 150,
          }}
        />
      </View>
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: mainColor,
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: '500',
    color: '#FFF',
  },
  form: {
    width: '100%',
    paddingHorizontal: 20,
    position: 'relative',
    marginBottom: 30,
  },
  formImage: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
  },
  image: {
    width: 350,
    height: 350,
  },
  error: {
    color: 'red',
  },
  groupBtn: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 20,
  },
});
