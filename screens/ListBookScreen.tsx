import { StyleSheet, View, ScrollView, TouchableOpacity, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import { IBook } from '../constants/interface';
import BookCardFlex from '../components/BookCardFlex';
import SearchHeader from '../components/Header';
import { useAppDispatch, useAppSelector } from '../app/hook';
import { useRoute } from '@react-navigation/native';
import { mainColor } from '../constants/Colors';
import { GetBookByCategoryAction, selectBooks } from '../reducers/bookSlice';
import SplashScreen from './SplashScreen';
import NotFoundScreen from './NotFoundScreen';

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
    sortBy: 'ASC',
  },
  {
    option: 'Giá cao',
    type: 'price',
    sortBy: 'DESC',
  },
];

const ListBookScreen = () => {
  const dispatch = useAppDispatch();
  const route = useRoute<any>();
  const books = useAppSelector(selectBooks);
  const isLoading = useAppSelector((state) => state.book.loading);
  useEffect(() => {
    if (route.params) {
      dispatch(GetBookByCategoryAction(route.params.id));
    }
  }, []);

  const [status, setStatus] = useState('Mới nhất');
  const handleOption = (option: string) => {
    setStatus(option);
  };

  if (isLoading === 'loading') return <SplashScreen />;
  if (isLoading === 'error') return <NotFoundScreen />;

  return (
    <View>
      <SearchHeader />
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
        <View style={{ marginBottom: 130 }}>
          <View style={styles.otherBooks}>
            {books.map((e, i) => (
              <BookCardFlex book={e} key={i} />
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default ListBookScreen;

const styles = StyleSheet.create({
  otherBooks: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingTop: 10,
    justifyContent: 'space-between',
  },
  arrange: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e2e2',
    shadowColor: '#e2e2e2',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
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
