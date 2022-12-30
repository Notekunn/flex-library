import { StyleSheet, Text, View, FlatList } from 'react-native';
import React, { useEffect } from 'react';
import CategoryItem from '../components/Store/CategoryItem';
import { mainColor } from '../constants/Colors';
import { Button } from '@rneui/themed';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useAppDispatch, useAppSelector } from '../app/hook';
import { GetAllCategoryAction, selectData } from '../reducers/categorySlice';
import { RootStackScreenProps } from '../types';

const CategoryScreen: React.FC<RootStackScreenProps<'Category'>> = ({ navigation, route }) => {
  const dispatch = useAppDispatch();
  const data = useAppSelector(selectData);
  const { chooseCategories, setChooseCategories } = route.params;

  useEffect(() => {
    dispatch(GetAllCategoryAction());
  }, []);
  const nav = useNavigation();
  const [choose, setChoose] = React.useState<number[]>(chooseCategories);
  useEffect(() => {
    setChooseCategories(choose);
  }, [choose]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Danh sách thể loại</Text>
      </View>
      <View style={{}}>
        <FlatList
          data={data}
          renderItem={({ item }: any) => <CategoryItem category={item} choose={choose} setChoose={setChoose} />}
        />
      </View>
      <View style={{ alignItems: 'center', marginTop: 20 }}>
        <Button
          title={'Chấp nhận'}
          buttonStyle={{
            backgroundColor: mainColor,
            width: 140,
            height: 50,
            borderRadius: 20,
          }}
          onPress={() => {
            nav.goBack();
          }}
        />
      </View>
    </View>
  );
};

export default CategoryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: mainColor,
    height: 100,
    paddingLeft: 10,
    paddingTop: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 25,
    color: '#fff',
    fontFamily: 'SansPro',
  },
});
