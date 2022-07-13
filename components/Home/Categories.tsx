import { Dimensions, FlatList, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import CategoryItem from './Category';
import { ICategory } from '../../constants/interface';

const { width, height } = Dimensions.get('window');

interface CategoryProps {
  data: ICategory[];
}

const CategoryList: React.FC<CategoryProps> = ({ data }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Thể loại sách</Text>
      <View>
        <FlatList
          data={data}
          horizontal={true}
          keyExtractor={(item, index) => index.toString()}
          // pagingEnabled={false}
          // scrollEnabled={false}
          contentContainerStyle={
            {
              // flex: 1,
              // justifyContent: 'center',
              // top: -10,
              // padding: SPACING * 2,
            }
          }
          snapToAlignment="start"
          decelerationRate={0.5}
          scrollEventThrottle={160}
          // showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => <CategoryItem category={item} />}
        />
      </View>
    </View>
  );
};

export default CategoryList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: width,
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
    marginBottom: 10,
  },
});
