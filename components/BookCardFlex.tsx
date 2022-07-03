import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import Navigation from '../navigation';
import { useNavigation } from '@react-navigation/native';
import { RootStackScreenProps, RootTabScreenProps } from '../types';
import { IBook } from '../constants/interface';

const { height, width } = Dimensions.get('window');
interface BookCardFlexProps {
  book: IBook;
}
const BookCardFlex: React.FC<BookCardFlexProps> = ({ book }) => {
  const navigation = useNavigation<any>();
  return (
    <TouchableOpacity onPress={() => navigation.push('Item', book)}>
      <View style={styles.container}>
        <Image
          style={styles.image}
          source={{
            uri: book.images[0] || 'https://via.placeholder.com/150',
          }}
        />
        <View style={styles.desc}>
          <Text style={styles.title}>{book.name}</Text>
          <View style={styles.infor}>
            <Text style={styles.price}>{book.salePrice}/giờ</Text>
            <Text style={styles.rented}>Đã cho thuê 200</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default BookCardFlex;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: (width - 30) / 2,
    backgroundColor: '#E5E6F8',
    // height: (width - 30) / 2 + 80,
    marginBottom: 10,
  },
  image: {
    height: (width - 20) / 2,
    width: (width - 30) / 2,
    resizeMode: 'cover',
  },
  desc: {
    alignSelf: 'flex-start',
    paddingHorizontal: 7,
    width: '100%',
  },
  infor: {
    flexDirection: 'row',
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    paddingVertical: 10,
  },
  price: {
    fontSize: 18,
    color: '#4C4CD7',
  },
  rented: {
    fontSize: 10,
  },
});
