import { StyleSheet, Text, View, Image, Dimensions } from 'react-native';
import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');
interface BookCardProps {
  data: any;
}

const BookCard: React.FC<BookCardProps> = ({ data }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('ViewBook', {
          id: data.id,
        })
      }
    >
      <View style={styles.container}>
        <Image source={{ uri: data.imageUrl }} style={styles.image} />
        <Text>{data.name}</Text>
        <Text style={styles.price}>{data.price}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default BookCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: (width - 40) / 4,
    height: 150,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginRight: 5,
    paddingTop: 5,
    backgroundColor: '#1ABC9C',
    borderRadius: 10,
  },
  image: {
    resizeMode: 'stretch',
    height: 120,
    width: (width - 90) / 4,
    borderRadius: 10,
  },
  price: {
    // alignSelf: 'flex-start',
    // marginLeft: 5,
    marginTop: 5,
  },
});
