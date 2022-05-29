import { Dimensions, FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Category from './Category'

const { width, height } = Dimensions.get('window')
const data = [
  {
    id: 1,
    name: 'Khoa học',
    icon: 'home',
  },
  {
    id: 1,
    name: 'Khoa học',
    icon: 'home',
  },
  {
    id: 1,
    name: 'Khoa học',
    icon: 'home',
  },
  {
    id: 1,
    name: 'Khoa học',
    icon: 'home',
  },
  {
    id: 1,
    name: 'Khoa học',
    icon: 'home',
  },
  {
    id: 1,
    name: 'Khoa học',
    icon: 'home',
  },
  {
    id: 1,
    name: 'Khoa học',
    icon: 'home',
  },
  {
    id: 1,
    name: 'Khoa học',
    icon: 'home',
  },
  {
    id: 1,
    name: 'Khoa học',
    icon: 'home',
  },
  {
    id: 1,
    name: 'Khoa học',
    icon: 'home',
  },
]
const Categories = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Thể loại sách</Text>
      <FlatList
        data={data}
        horizontal={true}
        keyExtractor={(item, index) => index.toString()}
        // pagingEnabled={false}
        // scrollEnabled={false}
        contentContainerStyle={
          {
            // flex: 1,
            // justifyContent: 'center',
            // top: -10,
            // padding: SPACING * 2,
          }
        }
        snapToAlignment="start"
        decelerationRate={0.5}
        scrollEventThrottle={160}
        // showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => <Category data={item} />}
      />
    </View>
  )
}

export default Categories

const styles = StyleSheet.create({
  container: {
    width: width,
    // flexDirection: 'row',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
    marginBottom: 10,
  },
})
