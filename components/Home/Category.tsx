import { StyleSheet, Text, View, Image, Dimensions } from 'react-native'
import React from 'react'
import { AntDesign } from '@expo/vector-icons'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'
interface categoryProps {
  data: any
}
const { width, height } = Dimensions.get('window')
const Category: React.FC<categoryProps> = ({ data }) => {
  const navigation = useNavigation()
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('SignIn')
      }}
    >
      <View style={styles.container}>
        <AntDesign name="qrcode" size={24} color="black" />
        {/* <Image source={{ uri: data.imageUrl }} /> */}
        <Text>{data.name}</Text>
      </View>
    </TouchableOpacity>
  )
}

export default Category

const styles = StyleSheet.create({
  container: {
    height: (width - 80) / 4,
    width: (width - 80) / 4,
    backgroundColor: '#F1DDF9',
    marginHorizontal: 10,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
