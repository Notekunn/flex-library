import { StyleSheet, Text, TextInput, View } from 'react-native';
import React, { useState } from 'react';
import { mainColor } from '../constants/Colors';
import { Button } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';

const ChangePasswordScreen = () => {
  const nav = useNavigation();
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const onSubmit = () => {
    if (newPassword !== confirmPassword) {
      alert('New password and confirm password not match');
      return;
    }
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>Change Password</Text>
      </View>
      <View style={{ flexDirection: 'column', width: '100%', padding: 40 }}>
        <View>
          <Text style={styles.text}>Old Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Old Password"
            secureTextEntry={true}
            onChangeText={(e) => setOldPassword(e)}
          />
        </View>
        <View>
          <Text style={styles.text}>New Password</Text>
          <TextInput
            style={styles.input}
            placeholder="New Password"
            secureTextEntry={true}
            onChangeText={(e) => setNewPassword(e)}
          />
        </View>
        <View>
          <Text style={styles.text}>Confirm Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            secureTextEntry={true}
            onChangeText={(e) => setConfirmPassword(e)}
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
            backgroundColor: '#fff',
          }}
          titleStyle={{ color: mainColor }}
          onPress={() => nav.goBack()}
        />
        <Button
          title={'Save'}
          containerStyle={{
            width: 100,
            height: 40,
            borderRadius: 20,
          }}
          buttonStyle={{
            backgroundColor: '#faad14',
          }}
          onPress={onSubmit}
        />
      </View>
    </View>
  );
};

export default ChangePasswordScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: mainColor,
  },
  title: {
    fontSize: 20,
    fontFamily: 'SansPro',
    color: '#FFF',
  },
  text: {
    marginBottom: 10,
    fontSize: 16,
    color: '#fff',
    fontFamily: 'SansPro',
  },
  input: {
    backgroundColor: '#fbfbfb',
    padding: 10,
    borderRadius: 20,
    width: '100%',
    marginBottom: 10,
  },
  groupButton: {
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
});
