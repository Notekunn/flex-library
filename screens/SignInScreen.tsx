import { useNavigation } from '@react-navigation/native';
import { Button, Input } from '@rneui/themed';
import React, { useState } from 'react';
import { StyleSheet, Image, Text, View, TouchableOpacity } from 'react-native';
import { useAppDispatch, useAppSelector } from '../app/hook';
import { mainColor } from '../constants/Colors';
import { loginAction, selectError } from '../reducers/authSlice';

import { RootTabScreenProps } from '../types';

export default function SignInScreen({ navigation }: RootTabScreenProps<'SignIn'>) {
  const nav = useNavigation();
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [error, setError] = useState(useAppSelector(selectError));
  const [hidePassword, setHidePassword] = useState(true);
  const dispatch = useAppDispatch();
  const onsubmit = (email: string, password: string) => {
    if (email.length === 0) {
      setEmailError('Email is required');
      return;
    }
    if (password.length === 0) {
      setPasswordError('Password is required');
      return;
    }
    dispatch(loginAction({ email, password }));
  };
  return (
    <View style={styles.container}>
      <View style={styles.image}>
        <Image
          source={require('../assets/images/spy.png')}
          style={{ alignSelf: 'center', justifyContent: 'center', width: 350, height: 350, resizeMode: 'contain' }}
        />
      </View>
      <View style={styles.form}>
        <Input
          placeholder="Email"
          leftIcon={{
            type: 'font-awesome',
            name: 'envelope',
            color: '#FFF',
            size: 20,
          }}
          onChangeText={(text) => setEmail(text.toLowerCase())}
          autoFocus={true}
          inputStyle={{ color: '#FFF', height: 50 }}
          pointerEvents="none"
          errorMessage={emailError}
        />
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
          inputStyle={{ color: '#FFF', height: 20 }}
          errorMessage={passwordError}
        />
      </View>
      <View style={styles.account}>
        <TouchableOpacity onPress={() => nav.navigate('SignUp')}>
          <View>
            <Text>You haven't an account ?</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View>
            <Text>Forgot password ?</Text>
          </View>
        </TouchableOpacity>
      </View>
      {error && <Text style={styles.error}>{error}</Text>}
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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: mainColor,
  },
  title: {
    fontSize: 20,
    fontWeight: '500',
  },
  form: {
    width: '100%',
    paddingHorizontal: 20,
  },
  image: {
    width: 350,
    height: 350,
  },
  error: {
    color: 'red',
    marginBottom: 15,
  },
  account: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 30,
    display: 'flex',
    marginBottom: 15,
  },
  text: {
    color: '#FFF',
  },
});
