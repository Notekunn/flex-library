import { FontAwesome } from '@expo/vector-icons';
import React from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import { mainColor } from '../../constants/Colors';

type SearchBarComponentProps = {};

export const Search: React.FunctionComponent<SearchBarComponentProps> = () => {
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
        editable={false}
      />
      <FontAwesome name="search" size={18} color={mainColor} style={{ position: 'absolute', right: 5 }} />
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
