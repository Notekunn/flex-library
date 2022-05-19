import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';
import React from 'react';
const { width, height } = Dimensions.get('window');
const CarsouselItem = ({ imageUrl, style }: any) => {
  return (
    <View style={styles.cardView}>
      <Image style={styles.image} source={{ uri: imageUrl }} />
      {/* <View style={styles.desc}>
        <Text>Truyện Conan Thám tử lừng danh</Text>
        <Text>Tập 1/??</Text>
        <Text>Tác giả Gosho Aoyama</Text>
      </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: width * 0.6,
    height: width * 0.6 * 1.4,
    borderRadius: 5,
    resizeMode: 'stretch',
  },
  cardView: {
    flex: 1,
    flexDirection: 'row',
    position: 'absolute',
    // width: 300,
    // height: 400,
    margin: 10,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0.5, height: 0.5 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 5,
  },
  desc: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
});

export default CarsouselItem;
