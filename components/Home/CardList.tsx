import { FlatList, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CardItem from './CardItem'

const categories = [
  {
    id: 1,
    title: 'Sách',
  },
  {
    id: 2,
    title: 'Đồ điện tử',
  },
  {
    id: 3,
    title: 'Đồ gia dụng',
  },
  {
    id: 4,
    title: 'Đồ thể thao',
  },
  {
    id: 5,
    title: 'Đồ đạc',
  },
]

const CardList = () => {
  return (
    <View style={styles.contaner}>
      <View style={styles.listItem}>
        {categories.map((item, index) => (
          <CardItem key={index} item={item} />
        ))}
      </View>
    </View>
  )
}

export default CardList

const styles = StyleSheet.create({
  contaner: {
    flex: 1,
    width: '100%',
    backgroundColor: 'yellow',
  },
  title: {
    backgroundColor: 'red',
  },
  listItem: {
    display: 'flex',
    backgroundColor: 'green',
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
  },
})
