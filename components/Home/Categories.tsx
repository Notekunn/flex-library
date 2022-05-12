import { FlatList, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Category from './Category';
const data = [
  {
    id: 1,
    name: 'Khoa học',
    icon: 'home',
  },
  {
    id: 1,
    name: 'Khoa học',
    icon: 'home',
  },
  {
    id: 1,
    name: 'Khoa học',
    icon: 'home',
  },
  {
    id: 1,
    name: 'Khoa học',
    icon: 'home',
  },
  {
    id: 1,
    name: 'Khoa học',
    icon: 'home',
  },
  {
    id: 1,
    name: 'Khoa học',
    icon: 'home',
  },
  {
    id: 1,
    name: 'Khoa học',
    icon: 'home',
  },
  {
    id: 1,
    name: 'Khoa học',
    icon: 'home',
  },
  {
    id: 1,
    name: 'Khoa học',
    icon: 'home',
  },
  {
    id: 1,
    name: 'Khoa học',
    icon: 'home',
  },
];
const Categories = () => {
  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        horizontal={true}
        keyExtractor={(item, index) => index.toString()}
        pagingEnabled
        scrollEnabled
        snapToAlignment='center'
        decelerationRate={0.8}
        scrollEventThrottle={16}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => <Category data={item} />}
      />
    </View>
  );
};

export default Categories;

const styles = StyleSheet.create({
  container: {
    // flexDirection: 'row',
  },
});
