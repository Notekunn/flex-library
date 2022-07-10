import { StyleSheet, Text, View, TextInput } from 'react-native';
import { Button, Icon, Image } from '@rneui/themed';
import React, { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { mainColor } from '../../constants/Colors';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useAppDispatch, useAppSelector } from '../../app/hook';
import { selectUser, updateUserAction } from '../../reducers/authSlice';
import { uploadImage } from '../../app/cloudinary';

const ProfileScreen = () => {
  const checkUrl = (image: string) => {
    const regx = /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;
    return regx.test(image);
  };
  const route = useRoute<any>();
  const dispatch = useAppDispatch();
  const [image, setImage] = useState(route.params?.avatar || '');
  const nav = useNavigation();
  const [name, setFullName] = useState('');
  const [editName, setEditName] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [editPhoneNumber, setEditPhoneNumber] = useState(false);

  const uploadAvatar = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
      base64: true,
    });
    if (!result.cancelled) {
      setImage(result);
    }
  };

  const updateProfile = async () => {
    const avaterUrl = await uploadImage(image);
    const data = {
      ...route.params,
      avatar: avaterUrl.url,
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
            source={{ uri: checkUrl(image) ? image : `data:image/png;base64,${image.base64}` }}
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
                onChangeText={(text) => setFullName(text)}
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
                <Icon name="edit-2" type="feather" size={18} onPress={() => nav.navigate('ChangePassword')} />
              </View>
            </View>
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
