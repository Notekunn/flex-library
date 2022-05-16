import { StyleSheet, Text, View, Image } from 'react-native';
import React from 'react';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Header = ({ avatarUrl }: any) => {
  return (
    <View style={styles.container}>
      <View style={styles.action}>
        <View style={styles.bell}>
          <MaterialCommunityIcons name='bell' size={24} color='white' />
        </View>
        <View style={styles.search}>
          <FontAwesome name='search' size={24} color='white' />
        </View>
        <Image source={{ uri: avatarUrl }} style={styles.avatar} />
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
  bell: {
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
