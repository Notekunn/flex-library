import { StyleSheet, Text, View, Image, Dimensions } from 'react-native';
import React from 'react';

const { width, height } = Dimensions.get('window');
interface props {
  data: any;
}

const BookCard: React.FC<props> = ({ data }) => {
  return (
    <View style={styles.container}>
      <Image source={{ uri: data.imageUrl }} style={styles.image} />
      <Text>{data.name}</Text>
      <Text>{data.price}</Text>
    </View>
  );
};

export default BookCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: (width - 40) / 4,
    height: 150,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginRight: 5,
    paddingTop: 5,
    backgroundColor: '#1ABC9C',
    borderRadius: 10,
  },
  image: {
    resizeMode: 'stretch',
    height: 100,
    width: (width - 100) / 4,
    borderRadius: 10,
  },
});
