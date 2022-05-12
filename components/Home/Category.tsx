import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
interface categoryProps {
  data: any;
}
const Category: React.FC<categoryProps> = ({ data }) => {
  return (
    <View style={styles.container}>
      <Text>{data.name}</Text>
    </View>
  );
};

export default Category;

const styles = StyleSheet.create({
  container: {
    height: 50,
    width: 100,
    backgroundColor: '#F1DDF9',
    marginHorizontal: 10,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
