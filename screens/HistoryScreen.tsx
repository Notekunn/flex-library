import { ScrollView, StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { Button, ListItem } from '@rneui/base'
import { useNavigation } from '@react-navigation/native'

const HistoryScreen = () => {
  const nav = useNavigation()
  return (
    // chưa có data
    // <View style={styles.container}>
    //     <View>
    //         <Text style={styles.title}>Your Shopping cart is empty</Text>
    //     </View>
    //     <View
    //         style={{
    //             alignItems: 'center',
    //             justifyContent: 'center',
    //             width: '100%',
    //             marginTop: 20,
    //             marginBottom: 20,
    //         }}
    //     >
    //         <Image
    //             source={{
    //                 uri: 'https://cdni.iconscout.com/illustration/premium/thumb/empty-cart-2130356-1800917.png',
    //             }}
    //             style={styles.imageLogoEmty}
    //         />
    //     </View>
    //     <Button
    //         title="Shoping now"
    //         buttonStyle={{ backgroundColor: '#f84b2f' }}
    //         containerStyle={{
    //             marginHorizontal: 50,
    //             marginVertical: 20,
    //             borderRadius: 15,
    //         }}
    //         titleStyle={{
    //             color: 'white',
    //             marginHorizontal: 20,
    //             fontSize: 20,
    //         }}
    //         onPress={() => {
    //             nav.navigate('Home');
    //         }}
    //     />
    // </View>
    //có data

    <ScrollView>
      <View style={styles.listItem}>
        <View style={styles.item}>
          <View>
            <Image
              source={{
                uri: 'https://tuoitho.mobi/upload/truyen/tham-tu-lung-danh-conan-tap-1/anh-bia.jpg',
              }}
              style={styles.image}
            />
          </View>
          <View style={styles.itemInfo}>
            <Text style={styles.itemName}>Truyện conan đặc biệt tập 1 âs</Text>
            <Text style={styles.price}>$3000</Text>
          </View>
        </View>
        <View style={styles.item}>
          <View>
            <Image
              source={{
                uri: 'https://tuoitho.mobi/upload/truyen/tham-tu-lung-danh-conan-tap-1/anh-bia.jpg',
              }}
              style={styles.image}
            />
          </View>
          <View style={styles.itemInfo}>
            <Text style={styles.itemName}>Truyện conan đặc biệt tập 1 âs</Text>
            <Text style={styles.price}>$3000</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  )
}

export default HistoryScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: '400',
    color: '#c4c4c4',
  },
  imageLogoEmty: {
    height: 300,
    resizeMode: 'stretch',
    width: '100%',
  },
  listItem: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'stretch',
  },
  item: {
    padding: 4,
    width: '48%',
    margin: 3,
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    minHeight: 200,
    resizeMode: 'stretch',
  },
  itemInfo: {},
  itemName: {
    fontSize: 16,
    fontWeight: '500',
  },
  price: {
    color: '#ce4144',
  },
})
