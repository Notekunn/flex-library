import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { Feather } from '@expo/vector-icons';

export interface ICategory {
  id: number;
  name: string;
}

interface ICategoryItemProps {
  category: ICategory;
  choose: number[];
  setChoose: (ids: number[]) => void;
}

const CategoryItem: React.FC<ICategoryItemProps> = ({ category, choose, setChoose }) => {
  const handleChoose = (id: number) => {
    if (choose.includes(id)) {
      setChoose(choose.filter((item) => item !== id));
    } else {
      setChoose([...choose, id]);
    }
  };
  return (
    <View style={styles.container}>
      {choose.includes(category.id) ? (
        <TouchableOpacity key={category.id} style={{ width: '100%' }} onPress={() => handleChoose(category.id)}>
          <View style={{ flexDirection: 'row', alignItems: 'center', position: 'relative' }}>
            <Text style={styles.name}>{category.name}</Text>
            <Feather size={25} color="green" name="check" style={{ position: 'absolute', right: 15 }} />
          </View>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity key={category.id} style={{ width: '100%' }} onPress={() => handleChoose(category.id)}>
          <View style={{ backgroundColor: '#F5FCFF' }}>
            <Text style={styles.name}>{category.name}</Text>
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default CategoryItem;

const styles = StyleSheet.create({
  container: {
    height: 45,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  name: {
    fontSize: 20,
    fontFamily: 'SansPro',
    color: '#000',
    padding: 10,
    textTransform: 'capitalize',
    width: '100%',
    backgroundColor: '#F5FCFF',
    borderBottomWidth: 0.4,
    borderColor: '#c1c1c1',
  },
});
