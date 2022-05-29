import React from 'react'
import { StyleSheet, View, Text, ScrollView } from 'react-native'
import { Search } from '../components/Home/SearchBar'
import SwipeSlide from '../components/Home/Carsousel'
import CardList from '../components/Home/CardList'
import Header from '../components/Header'
import Categories from '../components/Home/Categories'
import BookList from '../components/Home/BookList'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'
export default function HomeScreen() {
  const navigation = useNavigation()
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Header avatarUrl="https://tuoitho.mobi/upload/truyen/tham-tu-lung-danh-conan-tap-1/anh-bia.jpg" />
      </View>
      <ScrollView>
        <View style={styles.body}>
          <SwipeSlide />
          <Categories />
          <BookList />
          {/* <CardList /> */}
        </View>
      </ScrollView>
    </View>
  )
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
    // justssifyContent: 'center',
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
})
