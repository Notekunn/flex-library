import { View, StyleSheet, Image, Text } from 'react-native';
import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hook';
import { Button, Input } from '@rneui/themed';
import { mainColor } from '../constants/Colors';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';
export default function SignUpScreen() {
  const nav = useNavigation();
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [image, setImage] = useState('https://bloganchoi.com/wp-content/uploads/2021/08/avatar-vit-vang-trend-15.jpg');
  const [error, setError] = useState([] as String[]);
  const dispatch = useAppDispatch();
  const pickImage = async () => {
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
  const onsubmit = () => {
    setError([]);
    if (userName.length === 0) {
      error.push('User name is empty');
      setError(error);
    }
    if (email.length === 0) {
      error.push('Email is empty');
      setError(error);
    }
    if (password.length === 0) {
      error.push('Password is empty');
      setError(error);
    }
    if (confirmPassword.length === 0) {
      error.push('Confirm password is empty');
      setError(error);
    }
    if (password !== confirmPassword) {
      error.push('Password not match');
      setError(error);
    }
    if (image === '') {
      error.push('Image is empty');
      setError(error);
    }
    console.log(error);
  };
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>SignUp</Text>
      </View>
      <View style={styles.form}>
        <Input
          placeholder="User Name"
          onChangeText={(text) => setUserName(text)}
          inputStyle={{ color: '#FFF', height: 50 }}
        />
        <Input
          placeholder="Email"
          onChangeText={(text) => setEmail(text.toLowerCase())}
          autoFocus={true}
          inputStyle={{ color: '#FFF', height: 50 }}
          pointerEvents="none"
        />
        <Input
          placeholder="Password"
          secureTextEntry={true}
          onChangeText={(text) => setPassword(text)}
          inputStyle={{ color: '#FFF', height: 50 }}
        />
        <Input
          placeholder="Confirm Password"
          secureTextEntry={true}
          onChangeText={(text) => setConfirmPassword(text)}
          autoFocus={true}
          inputStyle={{ color: '#FFF', height: 50 }}
          pointerEvents="none"
        />
        <View style={styles.formImage}>
          <Button
            title="Upload Image"
            onPress={pickImage}
            buttonStyle={{
              backgroundColor: '#faad14',
              borderRadius: 15,
              height: 30,
              width: 100,
            }}
            titleStyle={{ fontStyle: 'italic', fontSize: 10 }}
          ></Button>
          <Image
            source={{
              uri: image,
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
          onPress={() => {
            onsubmit();
          }}
          loading={false}
          loadingProps={{ size: 'small', color: 'white' }}
          buttonStyle={{
            backgroundColor: 'rgba(111, 202, 186, 1)',
            borderRadius: 60,
            height: 45,
            width: 150,
          }}
        />
      </View>
      {error.map((item, index) => (
        <Text key={index} style={styles.error}>
          {item}
        </Text>
      ))}
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
