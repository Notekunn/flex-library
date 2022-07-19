import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native';
import React from 'react';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { ICategory } from '../Store/CategoryItem';
interface CategoryItemProps {
  category: ICategory;
}
const { width } = Dimensions.get('window');
const CategoryItem: React.FC<CategoryItemProps> = ({ category }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('ResultSearch', {
          categories: [category.id],
        });
      }}
    >
      <View style={styles.container}>
        <AntDesign name="qrcode" size={24} color="black" />
        {/* <Image source={{ uri: data.imageUrl }} /> */}
        <Text style={{ textTransform: 'capitalize' }}>{category.name}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default CategoryItem;

const styles = StyleSheet.create({
  container: {
    height: (width - 80) / 4,
    width: (width - 80) / 4,
    backgroundColor: '#F1DDF9',
    marginHorizontal: 10,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
});
