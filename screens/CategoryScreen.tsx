import { StyleSheet, Text, View, FlatList } from 'react-native'
import React, { useEffect } from 'react'
import CategoryItem from '../components/Store/CategoryItem'
import { mainColor } from '../constants/Colors'
import { Button } from '@rneui/themed'
import { useNavigation, useRoute } from '@react-navigation/native'
import { useAppDispatch, useAppSelector } from '../app/hook'
import { GetAllCategoryAction, selectData } from '../reducers/categorySlice'

const CategoryScreen = () => {
  const dispatch = useAppDispatch();
  const data = useAppSelector(selectData);
  useEffect(() => {
    dispatch(GetAllCategoryAction)
  },[])
  const route = useRoute<any>();
  const nav = useNavigation()
  const [choose, setChoose] = React.useState<number[]>(route.params.category)
  useEffect(() => {
    route.params.setCategory(choose)
  },[choose])
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Danh sách thể loại</Text>
        <Button title={"OK"}
          buttonStyle={{
            backgroundColor: mainColor,
            width:50,
            height:50,
          }}
          onPress={() => {nav.goBack()}}
        />
      </View>
      <View style={{flex:3}}>
        <FlatList
          data={data}
          renderItem={({ item }:any) => <CategoryItem category={item} choose={choose} setChoose={setChoose}/>}
        />
      </View>
    </View>
  )
}

export default CategoryScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header:{
    backgroundColor: mainColor,
    height: 50,
    paddingLeft: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 20,
    color: "#fff",
    fontFamily: 'SansPro',
  },
})