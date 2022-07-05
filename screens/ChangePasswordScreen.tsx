import { StyleSheet, Text, TextInput, View } from 'react-native';
import React, { useState } from 'react';
import { mainColor } from '../constants/Colors';
import { Button } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';
import { useAppDispatch } from '../app/hook';
import { changePasswordAction } from '../reducers/authSlice';

const ChangePasswordScreen = () => {
  const nav = useNavigation();
  const dispatch = useAppDispatch();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const onSubmit = () => {
    if (newPassword !== confirmPassword) {
      alert('New password and confirm password not match');
      return;
    }
    dispatch(changePasswordAction({ password: newPassword }));
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>Đổi mật khẩu</Text>
      </View>
      <View style={{ flexDirection: 'column', width: '100%', padding: 40 }}>
        <View>
          <Text style={styles.text}>Mật khẩu mới</Text>
          <TextInput
            style={styles.input}
            placeholder="**********"
            secureTextEntry={true}
            onChangeText={(e) => setNewPassword(e)}
          />
        </View>
        <View>
          <Text style={styles.text}>Xác nhận mật khẩu</Text>
          <TextInput
            style={styles.input}
            placeholder="**********"
            secureTextEntry={true}
            onChangeText={(e) => setConfirmPassword(e)}
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
            backgroundColor: '#fff',
          }}
          titleStyle={{ color: mainColor }}
          onPress={() => nav.goBack()}
        />
        <Button
          title={'Lưu'}
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
