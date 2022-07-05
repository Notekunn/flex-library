import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import { useAppDispatch, useAppSelector } from '../../app/hook';
import { mainColor } from '../../constants/Colors';
import { SearchSortTypes } from '../../constants/SearchSort';
import { selectSearchQuery, setSearchQuery } from '../../reducers/bookSlice';
import { RootStackScreenProps } from '../../types';

type SearchBarComponentProps = {};

export const Search: React.FC<SearchBarComponentProps> = () => {
  const q = useAppSelector(selectSearchQuery);
  const dispatch = useAppDispatch();
  const navigation = useNavigation<RootStackScreenProps<'Search'>['navigation']>();
  return (
    <View style={styles.view}>
      <TextInput
        style={{
          height: 40,
          width: 300,
          borderWidth: 1,
          paddingHorizontal: 8,
          alignItems: 'center',
          flexDirection: 'row',
          borderRadius: 10,
          borderColor: mainColor,
          backgroundColor: '#fff',
        }}
        placeholder="Tìm kiếm sách"
        value={q}
        onChangeText={(text) => dispatch(setSearchQuery(text))}
      />
      <FontAwesome
        name="search"
        size={18}
        color={mainColor}
        style={{ position: 'absolute', right: 5 }}
        onPress={() =>
          navigation.navigate('ResultSearch', {
            sort: SearchSortTypes.NEWEST,
          })
        }
      />
    </View>
  );
};
const styles = StyleSheet.create({
  view: {
    width: '100%',
    flexDirection: 'row',
    position: 'relative',
    alignItems: 'center',
  },
});
