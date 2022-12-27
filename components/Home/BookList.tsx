import { Dimensions, FlatList, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import BookCard from './BookCard';

const listImage = [
  {
    name: 'Truyện conan',
    price: '3,000/ngày',
    imageUrl: 'https://tuoitho.mobi/upload/truyen/tham-tu-lung-danh-conan-tap-1/anh-bia.jpg',
  },
  {
    name: 'Truyện conan',
    price: '3,000/ngày',
    imageUrl: 'https://tuoitho.mobi/upload/truyen/tham-tu-lung-danh-conan-tap-2/anh-bia.jpg',
  },
  {
    name: 'Truyện conan',
    price: '3,000/ngày',
    imageUrl: 'https://tuoitho.mobi/upload/truyen/tham-tu-lung-danh-conan-tap-3/anh-bia.jpg',
  },
  {
    name: 'Truyện conan',
    price: '3,000/ngày',
    imageUrl: 'https://tuoitho.mobi/upload/truyen/tham-tu-lung-danh-conan-tap-4/anh-bia.jpg',
  },
  {
    name: 'Truyện conan',
    price: '3,000/ngày',
    imageUrl: 'https://tuoitho.mobi/upload/truyen/tham-tu-lung-danh-conan-tap-5/anh-bia.jpg',
  },
  {
    name: 'Truyện conan',
    price: '3,000/ngày',
    imageUrl: 'https://tuoitho.mobi/upload/truyen/tham-tu-lung-danh-conan-tap-6/anh-bia.jpg',
  },
  {
    name: 'Truyện conan',
    price: '3,000/ngày',
    imageUrl: 'https://tuoitho.mobi/upload/truyen/tham-tu-lung-danh-conan-tap-7/anh-bia.jpg',
  },
  {
    name: 'Truyện conan',
    price: '3,000/ngày',
    imageUrl: 'https://tuoitho.mobi/upload/truyen/tham-tu-lung-danh-conan-tap-8/anh-bia.jpg',
  },
];
const { width, height } = Dimensions.get('window');
export interface BookListProps {}
const BookList: React.FC<BookListProps> = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Những cuốn sách nổi bật</Text>
      <FlatList
        data={listImage}
        horizontal={true}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => <BookCard data={{ ...item, id: index }} />}
      />
    </View>
  );
};

export default BookList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
    marginHorizontal: 10,
    // height: 200,
    // width: 150,
    // backgroundColor: '#000',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    // marginLeft: 10,
    marginBottom: 10,
  },
});
