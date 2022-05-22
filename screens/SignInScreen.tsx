import { Button, Input } from '@rneui/themed';
import React from 'react';
import { StyleSheet, Image, Text, View } from 'react-native';

import { RootTabScreenProps } from '../types';

export default function SignInScreen({ navigation }: RootTabScreenProps<'SignIn'>) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [hidePassword, setHidePassword] = React.useState(true);
  const onsubmit = (email: string, password: string) => {
    navigation.navigate('Root');
  };
  return (
    <View style={styles.container}>
      <View style={styles.image}>
        <Image source={require('../assets/images/logo.png')} style={{ width: '100%', height: '100%' }} />
      </View>
      {/* <Text style={styles.title}>Sign In To Your Account</Text> */}
      <View style={styles.form}>
        <Input
          placeholder="Email"
          leftIcon={{
            type: 'font-awesome',
            name: 'envelope',
            color: '#f50',
            size: 20,
          }}
          onChangeText={(text) => setEmail(text)}
        ></Input>
        <Input
          placeholder="Password"
          secureTextEntry={hidePassword}
          leftIcon={{
            type: 'font-awesome',
            name: 'lock',
            color: '#f50',
            size: 30,
          }}
          rightIcon={{
            type: 'font-awesome',
            name: hidePassword ? 'eye' : 'eye-slash',
            color: '#f50',
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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    fontWeight: '500',
  },
  form: {
    width: '100%',
  },
  image: {
    width: 200,
    height: 200,
  },
});
