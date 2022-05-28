import { Button, Input } from '@rneui/themed';
import React from 'react';
import { StyleSheet, Image, Text, View, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';
import { apiInstance } from '../config/axios';
import { mainColor } from '../constants/Colors';

import { RootTabScreenProps } from '../types';

export default function SignInScreen({ navigation }: RootTabScreenProps<'SignIn'>) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [hidePassword, setHidePassword] = React.useState(true);
  const onsubmit = (email: string, password: string) => {
    apiInstance
      .post(
        '/auth/login',
        JSON.stringify({
          email,
          password,
        }),
      )
      .then(({ data }) => {
        Alert.alert(`Welcome back, ${data.user.name}`);
        navigation.navigate('Root');
      })
      .catch((error) => {
        Alert.alert(`Loggin failed: ${error.message}`);
      });
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={true}>
      <View style={styles.container}>
        <View style={styles.image}>
          <Image
            source={require('../assets/images/spy.png')}
            style={{ alignSelf: 'center', justifyContent: 'center', width: 350, height: 350, resizeMode: 'contain' }}
          />
        </View>
        {/* <Text style={styles.title}>Sign In To Your Account</Text> */}
        <View style={styles.form}>
          <Input
            placeholder="Email"
            leftIcon={{
              type: 'font-awesome',
              name: 'envelope',
              color: '#FFF',
              size: 20,
            }}
            keyboardType="email-address"
            onChangeText={(text) => setEmail(text)}
            autoCapitalize="none"
          ></Input>
          <Input
            placeholder="Password"
            secureTextEntry={hidePassword}
            leftIcon={{
              type: 'font-awesome',
              name: 'lock',
              color: '#FFF',
              size: 30,
            }}
            rightIcon={{
              type: 'font-awesome',
              name: hidePassword ? 'eye' : 'eye-slash',
              color: '#FFF',
              size: 25,
              onPress: () => setHidePassword(!hidePassword),
            }}
            onChangeText={(text) => setPassword(text)}
          ></Input>
        </View>
        <Button
          title="Submit"
          onPress={() => {
            onsubmit(email, password);
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
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    // justifyContent: 'center',
    paddingTop: 100,
    backgroundColor: mainColor,
  },
  title: {
    fontSize: 20,
    fontWeight: '500',
  },
  form: {
    width: '100%',
    paddingHorizontal: 50,
  },
  image: {
    width: 350,
    height: 350,
  },
});
