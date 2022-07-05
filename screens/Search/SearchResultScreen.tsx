import { StyleSheet, View, ScrollView, TouchableOpacity, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import BookCardFlex from '../../components/BookCardFlex';
import SearchHeader from '../../components/Header';
import { useAppDispatch, useAppSelector } from '../../app/hook';
import { mainColor } from '../../constants/Colors';
import { SearchBookAction, selectBooks, selectSearchQuery } from '../../reducers/bookSlice';
import { RootStackScreenProps } from '../../types';
import { SearchSortOptions, SearchSortTypes } from '../../constants/SearchSort';

const SearchResultScreen: React.FC<RootStackScreenProps<'ResultSearch'>> = ({ route }) => {
  const { sort = SearchSortTypes.NEWEST, store } = route.params;
  const q = useAppSelector(selectSearchQuery);
  const dispatch = useAppDispatch();
  const [sortType, setSortType] = useState<SearchSortTypes>(sort);
  const handleOption = (option: SearchSortTypes) => {
    setSortType(option);
  };
  const books = useAppSelector(selectBooks);
  useEffect(() => {
    dispatch(
      SearchBookAction({
        page: 1,
        sort: sortType || SearchSortTypes.NEWEST,
        q,
        take: 25,
      }),
    );
  }, [sortType, q]);

  return (
    <View>
      <SearchHeader />
      <View style={styles.arrange}>
        {SearchSortOptions.map((option, i) => {
          return (
            <TouchableOpacity onPress={() => handleOption(option.sortBy)} key={i}>
              <Text style={[styles.option_title, sortType === option.title && styles.option_title_color]}>
                {option.title}
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
