import { StyleSheet, Text, View } from 'react-native';
import { Icon, Image } from '@rneui/themed';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const AccountScreen = () => {
  const nav = useNavigation();
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
            uri: 'https://bloganchoi.com/wp-content/uploads/2021/08/avatar-vit-vang-trend-15.jpg',
          }}
          style={styles.avatar}
        />
        <View>
          <Text style={styles.text}>Vit vang</Text>
        </View>
      </View>
      <View style={{ padding: 10 }}>
        <View>
          <Text style={styles.title}>Account</Text>
          <View style={styles.listItem}>
            <TouchableOpacity style={styles.item} activeOpacity={0.6}>
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
                <Text style={styles.text}>Profile</Text>
              </View>
              <Icon name="angle-right" type="font-awesome" color="#c1c1c1" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.item} activeOpacity={0.8} onPress={() => nav.navigate('Card')}>
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
                <Text style={styles.text}>Cart</Text>
              </View>
              <Icon name="angle-right" type="font-awesome" style={{ flex: 1 }} color="#c1c1c1" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.item} activeOpacity={0.8}>
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
                <Text style={styles.text}>Like</Text>
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
                <Text style={styles.text}>Notification</Text>
              </View>
              <Icon name="angle-right" type="font-awesome" style={{ flex: 1 }} color="#c1c1c1" />
            </TouchableOpacity>
          </View>
        </View>
        <View>
          <Text style={styles.title}>Orther</Text>
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
                <Text style={styles.text}>Help & Feedback</Text>
              </View>
              <Icon name="angle-right" type="font-awesome" color="#c1c1c1" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.item} activeOpacity={0.8}>
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
                <Text style={styles.text}>Logout</Text>
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
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 10,
    marginBottom: 10,
    color: '#c1c1c1',
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
    color: '#858585',
    flexWrap: 'wrap',
  },
});
