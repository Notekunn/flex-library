import { Dimensions, StyleSheet, Text, View } from 'react-native';
import React from 'react';
const { width, height } = Dimensions.get('window');
const CardItem = ({ item }: any) => {
  return (
    <View style={styles.container}>
      <Text style={styles.item}>Title</Text>
    </View>
  );
};

export default CardItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    padding: 10,
    margin: 10,
    backgroundColor: 'brown',
  },
});
