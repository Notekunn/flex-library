import {StyleSheet, View,ScrollView ,TouchableOpacity,Text} from 'react-native'
import React, { useState } from 'react'
import { IBook } from '../constants/interface'
import BookCardFlex from '../components/BookCardFlex'
import Header from '../components/Header'
import { useAppDispatch } from '../app/hook'
import { useRoute } from '@react-navigation/native'
import { mainColor } from '../constants/Colors'

const books:IBook[] = [
  {
    name: 'Book 1',
    price: 100,
    salePrice: 90,
    rentPrice: 80,
    description: 'Description 1',
    image: 'https://tuoitho.mobi/upload/truyen/tham-tu-lung-danh-conan-tap-8/anh-bia.jpg',
  },
  {
    name: 'Book 2',
    price: 100,
    salePrice: 90,
    rentPrice: 80,
    description: 'Description 2',
    image: 'https://tuoitho.mobi/upload/truyen/tham-tu-lung-danh-conan-tap-8/anh-bia.jpg',
  },
  {
    name: 'Book 1',
    price: 100,
    salePrice: 90,
    rentPrice: 80,
    description: 'Description 1',
    image: 'https://tuoitho.mobi/upload/truyen/tham-tu-lung-danh-conan-tap-8/anh-bia.jpg',
  },
  {
    name: 'Book 2',
    price: 100,
    salePrice: 90,
    rentPrice: 80,
    description: 'Description 2',
    image: 'https://tuoitho.mobi/upload/truyen/tham-tu-lung-danh-conan-tap-8/anh-bia.jpg',
  },
  {
    name: 'Book 1',
    price: 100,
    salePrice: 90,
    rentPrice: 80,
    description: 'Description 1',
    image: 'https://tuoitho.mobi/upload/truyen/tham-tu-lung-danh-conan-tap-8/anh-bia.jpg',
  },
  {
    name: 'Book 2',
    price: 100,
    salePrice: 90,
    rentPrice: 80,
    description: 'Description 2',
    image: 'https://tuoitho.mobi/upload/truyen/tham-tu-lung-danh-conan-tap-8/anh-bia.jpg',
  },
  {
    name: 'Book 1',
    price: 100,
    salePrice: 90,
    rentPrice: 80,
    description: 'Description 1',
    image: 'https://tuoitho.mobi/upload/truyen/tham-tu-lung-danh-conan-tap-8/anh-bia.jpg',
  },
  {
    name: 'Book 2',
    price: 100,
    salePrice: 90,
    rentPrice: 80,
    description: 'Description 2',
    image: 'https://tuoitho.mobi/upload/truyen/tham-tu-lung-danh-conan-tap-8/anh-bia.jpg',
  },
]
const listOptions = [
  {
    option: 'Mới nhất',
    type: 'Date',
    sortBy: 'DESC',
  },
  {
    option: 'Bán chạy',
    type: 'Number',
    sortBy: 'DESC',
  },
  {
    option: 'Giá thấp',
    type: 'price',
    sortBy: 'ASC'
  },
  {
    option: 'Giá cao',
    type: 'price',
    sortBy: 'DESC'
  },
];

const ListBookScreen = () => {
  const dispatch = useAppDispatch();
  const route = useRoute<any>();
  // lấy ra id category
  const [status, setStatus] = useState('Mới nhất');
  const handleOption = (option: string) => {
    setStatus(option);
  }
  return (
    <View>
      <Header />
      <View style={styles.arrange}>
        {listOptions.map((e, i) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  handleOption(e.option);
                }}
                key={i}
              >
                <Text style={[styles.option_title, status === e.option && styles.option_title_color]}>{e.option}</Text>
              </TouchableOpacity>
            );
          })}
      </View>
      <ScrollView>
        <View style={styles.otherBooks}>
          {books.map((e, i) => <BookCardFlex book = {e}/>)}
        </View>
      </ScrollView>
    </View>
  )
}

export default ListBookScreen

const styles = StyleSheet.create({
  otherBooks: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingTop: 10,
    justifyContent: 'space-between',
  },
  arrange:{
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e2e2',
    shadowColor: "#e2e2e2",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.00,
    elevation: 1
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
})