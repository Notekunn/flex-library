import { StyleSheet, Text, View, TextInput } from 'react-native';
import { Button, Icon, Image } from '@rneui/themed';
import React, { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { mainColor } from '../../constants/Colors';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useAppDispatch, useAppSelector } from '../../app/hook';
import { selectUser, updateUserAction } from '../../reducers/authSlice';

const ProfileScreen = () => {
  const route = useRoute<any>();
  const dispatch = useAppDispatch();
  const infoUpdate = useAppSelector(selectUser);
  const [image, setImage] = useState(route.params.avatar);
  const nav = useNavigation();
  const [name, setFullName] = useState('');
  const [editName, setEditName] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [editPhoneNumber, setEditPhoneNumber] = useState(false);

  const uploadAvatar = async () => {
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

  const updateProfile = async () => {
    const data = {
      ...route.params,
      avatar: image,
      name: name,
    };
    dispatch(updateUserAction(data));
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'flex-end',
            width: 100,
            height: 100,
            borderRadius: 50,
            marginBottom: 5,
            justifyContent: 'center',
            position: 'relative',
          }}
        >
          <Image
            source={{ uri: image || 'https://bloganchoi.com/wp-content/uploads/2021/08/avatar-vit-vang-trend-15.jpg' }}
            style={styles.avatar}
          />
          <View
            style={{ position: 'absolute', right: 0, backgroundColor: 'transparent', padding: 3, borderRadius: 50 }}
          >
            <Icon name="camera" type="feather" size={20} color={mainColor} onPress={uploadAvatar} />
          </View>
        </View>
      </View>
      <View style={styles.body}>
        <View>
          <View style={{ flexDirection: 'column', marginBottom: 5 }}>
            <Text style={styles.textTitle}>Email</Text>
            <TextInput
              style={{ backgroundColor: '#fbfbfb', padding: 10, borderRadius: 20 }}
              placeholder={route.params.email}
              editable={false}
            />
          </View>
          <View style={{ flexDirection: 'column', marginBottom: 5 }}>
            <Text style={styles.textTitle}>Họ & Tên</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', position: 'relative' }}>
              <TextInput
                style={{ backgroundColor: '#fbfbfb', padding: 10, borderRadius: 20, width: '100%' }}
                placeholder={route.params.name}
                editable={editName}
              />
              <View style={{ position: 'absolute', right: 10 }}>
                <Icon
                  name="edit-2"
                  type="feather"
                  size={18}
                  color={editName ? mainColor : ''}
                  onPress={() => setEditName(!editName)}
                />
              </View>
            </View>
          </View>
          <View style={{ flexDirection: 'column', marginBottom: 5 }}>
            <Text style={styles.textTitle}>Số điện thoại</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', position: 'relative' }}>
              <TextInput
                style={{ backgroundColor: '#fbfbfb', padding: 10, borderRadius: 20, width: '100%' }}
                placeholder="0373376457"
                editable={editPhoneNumber}
                onChangeText={(text) => setPhoneNumber(text)}
              />
              <View style={{ position: 'absolute', right: 10 }}>
                <Icon
                  name="edit-2"
                  type="feather"
                  size={18}
                  color={editPhoneNumber ? mainColor : ''}
                  onPress={() => setEditPhoneNumber(!editPhoneNumber)}
                />
              </View>
            </View>
          </View>
          <View style={{ flexDirection: 'column', marginBottom: 5 }}>
            <Text style={styles.textTitle}>Mật khẩu</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', position: 'relative' }}>
              <TextInput
                style={{ backgroundColor: '#fbfbfb', padding: 10, borderRadius: 20, width: '100%' }}
                placeholder="**********"
                editable={false}
              />
              <View style={{ position: 'absolute', right: 10 }}>
                <Icon
                  name="edit-2"
                  type="feather"
                  size={18}
                  color={editPhoneNumber ? mainColor : ''}
                  onPress={() => nav.navigate('ChangePassword')}
                />
              </View>
            </View>
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
            onPress={updateProfile}
          />
        </View>
      </View>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  header: {
    width: '100%',
    height: 150,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  name: {
    fontSize: 18,
    color: '#FFF',
    textTransform: 'capitalize',
    fontFamily: 'SansPro',
  },
  avatar: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
    borderRadius: 50,
    borderWidth: 0.5,
    borderColor: mainColor,
  },
  body: {
    flex: 3,
    flexDirection: 'column',
    backgroundColor: '#FFF',
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