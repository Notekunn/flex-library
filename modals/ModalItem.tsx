import { StyleSheet, Text, View, Image, Dimensions } from 'react-native'
import React from 'react'
import { RootStackScreenProps } from '../types'

const listImage = [
  'https://tuoitho.mobi/upload/truyen/tham-tu-lung-danh-conan-tap-1/anh-bia.jpg',
  'https://tuoitho.mobi/upload/truyen/tham-tu-lung-danh-conan-tap-2/anh-bia.jpg',
  'https://tuoitho.mobi/upload/truyen/tham-tu-lung-danh-conan-tap-3/anh-bia.jpg',
  'https://tuoitho.mobi/upload/truyen/tham-tu-lung-danh-conan-tap-4/anh-bia.jpg',
  'https://tuoitho.mobi/upload/truyen/tham-tu-lung-danh-conan-tap-5/anh-bia.jpg',
]
const { width } = Dimensions.get('window')

const ModalItem = ({ navigation }: RootStackScreenProps<'ModalItem'>) => {
  return (
    <View style={styles.container}>
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <Text
          style={{
            fontSize: 30,
            marginVertical: 20,
            color: '#fff',
            fontWeight: 'bold',
          }}
        >
          Your Code
        </Text>
        <Image
          style={styles.image}
          source={{
            uri: 'https://printgo.vn/uploads/media/790919/tao-ma-qr-code-san-pham-1_1620927223.jpg',
          }}
        />
      </View>
    </View>
  )
}

export default ModalItem

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4C4CD7',
  },
  image: {
    height: 250,
    width: width,
    resizeMode: 'contain',
  },
})
