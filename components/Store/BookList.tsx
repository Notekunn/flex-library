import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import BookCardFlex from '../BookCardFlex';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { mainColor } from '../../constants/Colors';

const BookList = () => {
  const listOptions = [
    {
      option: 'Mới nhất',
    },
    {
      option: 'Bán chạy',
    },
    {
      option: 'Giá thấp',
    },
    {
      option: 'Giá cao',
    },
  ];
  const [imageUrl, setImageUrl] = useState(
    'https://tuoitho.mobi/upload/truyen/tham-tu-lung-danh-conan-tap-1/anh-bia.jpg',
  );
  const handleOption = (option: string) => {
    setStatus(option);
    setImageUrl('https://loremflickr.com/320/240');
  };
  const [status, setStatus] = useState('Mới nhất');
  return (
    <View style={styles.container}>
      <View style={styles.options}>
        {listOptions.map((e, i) => {
          return (
            <TouchableOpacity
              onPress={() => {
                handleOption(e.option);
              }}
            >
              <Text style={[styles.option_title, status === e.option && styles.option_title_color]}>{e.option}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
      <ScrollView>
        <View style={styles.listItem}>
          {Array.from(Array(10)).map(() => {
            return <BookCardFlex url={imageUrl} />;
          })}
        </View>
      </ScrollView>
    </View>
  );
};

export default BookList;

const styles = StyleSheet.create({
  column: {
    height: 12,
    borderRightWidth: 1,
    borderColor: 'gray',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  container: {},
  options: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    // paddingHorizontal: 15,
    alignItems: 'center',
    height: 40,
    backgroundColor: '#ABCEFC',
  },
  listItem: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingTop: 10,
  },
  option_title: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  option_title_color: {
    alignItems: 'center',
    justifyContent: 'center',
    color: mainColor,
  },
});
