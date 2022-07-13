import React, { useEffect } from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { Search } from '../../components/Home/SearchBar';
import SwipeSlide from '../../components/Home/Carsousel';
import CardList from '../../components/Home/CardList';
import SearchHeader from '../../components/Header';
import CategoryList from '../../components/Home/Categories';
import BookList from '../../components/Home/BookList';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { useAppDispatch, useAppSelector } from '../../app/hook';
import { GetAllCategoryAction, selectData } from '../../reducers/categorySlice';
export default function HomeScreen() {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const categories = useAppSelector(selectData);
  console.log(categories);

  useEffect(() => {
    dispatch(GetAllCategoryAction());
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <SearchHeader />
      </View>
      {/* <ScrollView>
        
      </ScrollView> */}
      <View style={styles.body}>
        <SwipeSlide />
        <CategoryList data={categories} />
        {/* <BookList /> */}
        {/* <CardList /> */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // position: 'relative',
    flex: 1,
    // backgroundColor: '#F1DDF9',
  },
  header: {
    // marginTop: 30,
  },
  body: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
