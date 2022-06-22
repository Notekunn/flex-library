import { Entypo, Feather, FontAwesome5, Fontisto } from '@expo/vector-icons';
import { StyleSheet, Text } from 'react-native';
import { mainColor } from '../../constants/Colors';
import { View } from '../Themed';

export function ItemHeaderRight() {
  return (
    <View style={styles.container}>
      <View style={styles.searchBox}>
        <FontAwesome5 name="search" size={16} color={mainColor} />
        <Text style={styles.searchText}>Tìm kiếm trên FL</Text>
      </View>
      <View style={styles.iconBox}>
        <Fontisto style={{ marginHorizontal: 5 }} name="share-a" size={24} color="#4C4CD7" />
        <Feather style={{ marginHorizontal: 5 }} name="shopping-cart" size={24} color="#4C4CD7" />
        <Entypo style={{ marginLeft: 5 }} name="dots-three-vertical" size={24} color="#4C4CD7" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchBox: {
    height: 30,
    width: 250,
    borderWidth: 1,
    paddingHorizontal: 8,
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: 10,
    // left: -30,
  },
  searchText: {
    color: 'gray',
    marginLeft: 5,
  },
  iconBox: {
    flexDirection: 'row',
    paddingLeft: 15,
  },
});
