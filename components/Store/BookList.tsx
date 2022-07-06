import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import BookCardFlex from '../BookCardFlex';
import { ScrollView, TouchableOpacity } from 'react-native';
import { mainColor } from '../../constants/Colors';
import { IBook } from '../../constants/interface';
import { SearchSortOptions, SearchSortTypes } from '../../constants/SearchSort';
import { useAppDispatch, useAppSelector } from '../../app/hook';
import { GetBookByStoreAction, selectBooks } from '../../reducers/bookSlice';

export interface BookListProps {
  storeId?: number;
  q?: string;
}

const BookList: React.FC<BookListProps> = ({ storeId, q }) => {
  const books = useAppSelector(selectBooks);
  const dispatch = useAppDispatch();
  const [sort, setSort] = useState(SearchSortTypes.NEWEST);
  useEffect(() => {
    if (storeId && storeId > 0) {
      dispatch(
        GetBookByStoreAction({
          id: storeId,
          sort,
          q,
        }),
      );
    }
  }, [sort, storeId, q]);
  return (
    <View style={styles.container}>
      <View>
        <View style={styles.options}>
          {SearchSortOptions.map((option, i) => {
            return (
              <TouchableOpacity onPress={() => setSort(option.sortBy)} key={i}>
                <Text style={[styles.option_title, sort === option.sortBy && styles.option_title_color]}>
                  {option.title}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
      {books.length > 0 && (
        <ScrollView>
          <View style={{ paddingHorizontal: 10, marginTop: 10 }}>
            <View style={styles.listItem}>
              {books.length > 0 && books.map((e, i) => <BookCardFlex book={e} key={i} />)}
            </View>
          </View>
        </ScrollView>
      )}
    </View>
  );
};

export default React.memo(BookList, (prevProps, nextProps) => {
  return prevProps.storeId == nextProps.storeId && prevProps.q == nextProps.q;
});

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
    justifyContent: 'space-between',
    marginBottom: 40,
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
