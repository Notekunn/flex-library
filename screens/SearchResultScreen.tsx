import { StyleSheet, View, ScrollView, TouchableOpacity, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import { IBook } from '../constants/interface';
import BookCardFlex from '../components/BookCardFlex';
import Header from '../components/Header';
import { useAppDispatch, useAppSelector } from '../app/hook';
import { useRoute } from '@react-navigation/native';
import { mainColor } from '../constants/Colors';
import { GetBookByCategoryAction, SearchBookAction, selectBook } from '../reducers/bookSlice';
import { Search } from '../components/Home/SearchBar';

const listOptions = [
  {
    option: 'Mới nhất',
    sortBy: 'createdAt:asc',
  },
  {
    option: 'Bán chạy',
    sortBy: 'DESC',
  },
  {
    option: 'Giá thấp',
    sortBy: 'rentPrice:desc',
  },
  {
    option: 'Giá cao',
    sortBy: 'rentPrice:asc',
  },
];

const SearchResultScreen = () => {
  const dispatch = useAppDispatch();
  const route = useRoute<any>();
  const [status, setStatus] = useState<any>(listOptions[0]);
  const handleOption = (option: object) => {
    setStatus(option);
  };
  const books = useAppSelector(selectBook);
  useEffect(() => {
    console.log({
      page: 1,
      sort: status.sortBy,
      query: route.params,
      take: 10,
    });
    dispatch(
      SearchBookAction({
        page: 1,
        sort: status.sortBy,
        query: route.params,
        take: 10,
      }),
    );
  }, [status]);

  return (
    <View>
      <Header />
      <View style={styles.arrange}>
        {listOptions.map((e, i) => {
          return (
            <TouchableOpacity
              onPress={() => {
                handleOption(e);
              }}
              key={i}
            >
              <Text style={[styles.option_title, status.option === e.option && styles.option_title_color]}>
                {e.option}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
      <ScrollView>
        <View style={styles.otherBooks}>
          {books.map((e, i) => (
            <BookCardFlex book={e} key={i} />
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default SearchResultScreen;

const styles = StyleSheet.create({
  otherBooks: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingTop: 10,
    justifyContent: 'space-between',
    paddingBottom: 120,
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
