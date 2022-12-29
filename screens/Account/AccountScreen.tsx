import { Alert, Button, StyleSheet, Text, View } from 'react-native';
import { Icon, Image } from '@rneui/themed';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { mainColor } from '../../constants/Colors';
import { useAppDispatch, useAppSelector } from '../../app/hook';
import { logoutAction, profileAction, selectOwnStore, selectUser } from '../../reducers/authSlice';
import { RootStackScreenProps } from '../../types';
import { moneyFormat } from '../../constants/Money';

const AccountScreen: React.FC<RootStackScreenProps<'Root'>> = ({ navigation }) => {
  const nav = useNavigation<any>();
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const ownStore = useAppSelector(selectOwnStore);
  const profile = useAppSelector(selectUser);

  const handleLogout = () => {
    Alert.alert('Đăng xuất', 'Bạn có chắc muốn đăng xuất?', [
      { text: 'Đồng ý', onPress: () => dispatch(logoutAction()) },
      {
        text: 'Hủy bỏ',
        style: 'cancel',
      },
    ]);
  };
  return (
    <View style={styles.container}>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          marginTop: 50,
        }}
      >
        <Image
          source={{
            uri: user?.avatar || 'https://bloganchoi.com/wp-content/uploads/2021/08/avatar-vit-vang-trend-15.jpg',
          }}
          style={styles.avatar}
        />
        <View>
          <Text style={styles.text}>{user?.name}</Text>
        </View>
      </View>
      <View style={{ padding: 10 }}>
        <View>
          <Text style={styles.title}>Tài khoản</Text>
          <View style={styles.listItem}>
            <TouchableOpacity style={styles.item} activeOpacity={0.6} onPress={() => nav.navigate('Profile', user)}>
              <View
                style={{
                  backgroundColor: '#00ff0885',
                  borderRadius: 5,
                  padding: 5,
                  width: 30,
                  height: 30,
                }}
              >
                <Icon name="user" type="font-awesome" size={20} color="#fff" solid={true} />
              </View>
              <View
                style={{
                  flex: 2,
                  marginLeft: 30,
                }}
              >
                <Text style={styles.text}>Hồ sơ</Text>
              </View>
              <Icon name="angle-right" type="font-awesome" color="#c1c1c1" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.item} activeOpacity={0.8} onPress={() => nav.navigate('Order')}>
              <View
                style={{
                  backgroundColor: '#fff700b8',
                  borderRadius: 5,
                  padding: 5,
                  width: 30,
                  height: 30,
                }}
              >
                <Icon name="shopping-cart" type="feather" color="#fff" size={20} solid={true} />
              </View>
              <View
                style={{
                  flex: 2,
                  marginLeft: 30,
                }}
              >
                <Text style={styles.text}>Đơn hàng</Text>
              </View>
              <Icon name="angle-right" type="font-awesome" style={{ flex: 1 }} color="#c1c1c1" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.item} activeOpacity={0.8} onPress={() => navigation.navigate('Renting')}>
              <View
                style={{
                  backgroundColor: '#ff9b30',
                  borderRadius: 5,
                  padding: 5,
                  width: 30,
                  height: 30,
                }}
              >
                <Icon name="archive" type="font-awesome" color="#fff" size={20} solid={true} />
              </View>
              <View
                style={{
                  flex: 2,
                  marginLeft: 30,
                }}
              >
                <Text style={styles.text}>Sách đang mượn</Text>
              </View>
              <Icon name="angle-right" type="font-awesome" style={{ flex: 1 }} color="#c1c1c1" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.item} activeOpacity={0.8} >
              <View
                style={{
                  backgroundColor: '#ff000085',
                  borderRadius: 5,
                  padding: 5,
                  width: 30,
                  height: 30,
                }}
              >
                <Icon name="heart" type="font-awesome" color="#fff" size={20} solid={true} />
              </View>
              <View
                style={{
                  flex: 2,
                  marginLeft: 30,
                }}
              >
                <Text style={styles.text}>Yêu thích</Text>
              </View>
              <Icon name="angle-right" type="font-awesome" style={{ flex: 1 }} color="#c1c1c1" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.item} activeOpacity={0.8} onPress={() => navigation.navigate("CoinScreen")}>
              <View
                style={{
                  backgroundColor: '#ff00e885',
                  borderRadius: 5,
                  padding: 5,
                  width: 30,
                  height: 30,
                }}
              >
                <Icon name="money" type="font-awesome" color="#fff" size={20} solid={true} />
              </View>
              <View
                style={{
                  flex: 2,
                  marginLeft: 30,
                }}
              >
                <Text style={styles.text}>WibuCoin: {moneyFormat(profile?.coin || 0, false)}</Text>
              </View>
              <Icon name="angle-right" type="font-awesome" style={{ flex: 1 }} color="#c1c1c1" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.item} activeOpacity={0.8}>
              <View
                style={{
                  backgroundColor: '#ff00e885',
                  borderRadius: 5,
                  padding: 5,
                  width: 30,
                  height: 30,
                }}
              >
                <Icon name="bell" type="font-awesome" color="#fff" size={20} solid={true} />
              </View>
              <View
                style={{
                  flex: 2,
                  marginLeft: 30,
                }}
              >
                <Text style={styles.text}>Thông báo</Text>
              </View>
              <Icon name="angle-right" type="font-awesome" style={{ flex: 1 }} color="#c1c1c1" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.item}
              activeOpacity={0.8}
              onPress={() => (ownStore ? nav.navigate('ViewMyStore', ownStore) : nav.navigate('CreateStore'))}
            >
              <View
                style={{
                  backgroundColor: '#ea4335',
                  borderRadius: 5,
                  padding: 5,
                  width: 30,
                  height: 30,
                }}
              >
                <Icon name="book-open" type="feather" color="#fff" size={20} solid={true} />
              </View>
              <View
                style={{
                  flex: 2,
                  marginLeft: 30,
                }}
              >
                <Text style={styles.text}>{ownStore ? 'Cửa hàng của bạn' : 'Tạo cửa hàng'}</Text>
              </View>
              <Icon name="angle-right" type="font-awesome" style={{ flex: 1 }} color="#c1c1c1" />
            </TouchableOpacity>
          </View>
        </View>
        <View>
          <Text style={styles.title}>Khác</Text>
          <View style={styles.listItem}>
            <TouchableOpacity style={styles.item} activeOpacity={0.8}>
              <View
                style={{
                  backgroundColor: '#c3b666b8',
                  borderRadius: 5,
                  padding: 5,
                  width: 30,
                  height: 30,
                }}
              >
                <Icon name="life-ring" type="font-awesome" color="#fff" size={20} />
              </View>
              <View
                style={{
                  flex: 2,
                  marginLeft: 30,
                }}
              >
                <Text style={styles.text}>Trợ giúp & Phản hồi</Text>
              </View>
              <Icon name="angle-right" type="font-awesome" color="#c1c1c1" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.item} activeOpacity={0.8} onPress={handleLogout}>
              <View
                style={{
                  backgroundColor: '#cbcbcb82',
                  borderRadius: 5,
                  padding: 5,
                  width: 30,
                  height: 30,
                }}
              >
                <Icon name="log-out" type="feather" color="#fff" size={20} />
              </View>
              <View
                style={{
                  flex: 2,
                  marginLeft: 30,
                }}
              >
                <Text style={styles.text}>Đăng xuất</Text>
              </View>
              <Icon name="angle-right" type="font-awesome" style={{ flex: 1 }} color="#c1c1c1" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default AccountScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  avatar: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 100,
    width: 100,
    resizeMode: 'stretch',
    borderRadius: 50,
    borderWidth: 0.25,
    borderColor: mainColor,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 10,
    marginBottom: 10,
    color: mainColor,
  },
  listItem: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  item: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#fff',
    borderBottomColor: '#ccc',
    borderBottomWidth: 0.8,
    alignItems: 'center',
    width: '100%',
    justifyContent: 'space-around',
  },
  text: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
    flexWrap: 'wrap',
  },
});
