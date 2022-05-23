import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { Feather, FontAwesome } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const Header = ({ avatarUrl }: any) => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.action}>
        <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
          <View style={styles.cart}>
            <FontAwesome name="shopping-cart" size={26} color="white" />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Search')}>
          <View style={styles.search}>
            <FontAwesome name="search" size={24} color="white" />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Store')}>
          <Image source={{ uri: avatarUrl }} style={styles.avatar} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    // flex: 1,

    flexDirection: 'row',
    justifyContent: 'flex-end',
    // alignItems: 'center',
    paddingTop: 22,
    paddingHorizontal: 20,
    height: 82,
    backgroundColor: '#4C4CD7',
  },
  avatar: {
    height: 40,
    width: 40,
    borderRadius: 20,
  },
  search: {
    borderRadius: 20,
    backgroundColor: '#A2A9EB',
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    width: 40,
    marginHorizontal: 10,
  },
  cart: {
    borderRadius: 20,
    backgroundColor: '#A2A9EB',
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    width: 40,
  },
  action: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingVertical: 15,
  },
});
