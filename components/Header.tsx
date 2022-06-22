import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Search } from './Home/SearchBar';

const Header = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.action}>
        <TouchableOpacity onPress={() => navigation.navigate('Cart')}></TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Search')}>
          <Search />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
          <FontAwesome name="shopping-cart" size={26} color="white" />
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
  action: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 15,
    alignItems: 'center',
    width: '100%',
  },
});
