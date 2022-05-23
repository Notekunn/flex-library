import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import React from 'react';
import { Button, Icon, ListItem } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';

const CartScreen = () => {
  const nav = useNavigation();
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
      <View style={{ marginBottom: 5 }}>
        <ListItem.Swipeable
          leftContent={(reset) => (
            <Button
              title="Info"
              onPress={() => reset()}
              icon={{
                name: 'info',
                type: 'feather',
                color: 'white',
              }}
              buttonStyle={{
                minHeight: '100%',
                backgroundColor: '#0052d1',
              }}
            />
          )}
          rightContent={(reset) => (
            <Button
              title="Delete"
              onPress={() => reset()}
              icon={{
                name: 'trash',
                type: 'feather',
                color: 'white',
              }}
              buttonStyle={{
                minHeight: '100%',
                backgroundColor: '#f84b2f',
              }}
            />
          )}
        >
          <ListItem.Content>
            <View style={styles.item}>
              <View style={styles.info}>
                <Image
                  source={{
                    uri: 'https://tuoitho.mobi/upload/truyen/tham-tu-lung-danh-conan-tap-1/anh-bia.jpg',
                  }}
                  style={styles.image}
                />
                <View style={styles.detail}>
                  <Text style={styles.text}>truyen conan tap 1</Text>
                  <Text style={styles.text}>$3000</Text>
                </View>
              </View>
              <View style={styles.quantity}>
                <Button
                  icon={{
                    name: 'minus',
                    type: 'font-awesome',
                    color: 'white',
                  }}
                  buttonStyle={{
                    backgroundColor: '#f9ccad',
                    padding: 0,
                  }}
                />

                <Text style={{ margin: 10 }}>1</Text>
                <Button
                  icon={{
                    name: 'plus',
                    type: 'font-awesome',
                    color: 'white',
                  }}
                  buttonStyle={{
                    backgroundColor: '#f9ccad',
                    padding: 0,
                  }}
                />
              </View>
            </View>
          </ListItem.Content>
        </ListItem.Swipeable>
      </View>
      <View style={{ marginBottom: 5 }}>
        <ListItem.Swipeable
          leftContent={(reset) => (
            <Button
              title="Info"
              onPress={() => reset()}
              icon={{
                name: 'info',
                type: 'feather',
                color: 'white',
              }}
              buttonStyle={{
                minHeight: '100%',
                backgroundColor: '#0052d1',
              }}
            />
          )}
          rightContent={(reset) => (
            <Button
              title="Delete"
              onPress={() => reset()}
              icon={{
                name: 'trash',
                type: 'feather',
                color: 'white',
              }}
              buttonStyle={{
                minHeight: '100%',
                backgroundColor: '#f84b2f',
              }}
            />
          )}
        >
          <ListItem.Content>
            <View style={styles.item}>
              <View style={styles.info}>
                <Image
                  source={{
                    uri: 'https://tuoitho.mobi/upload/truyen/tham-tu-lung-danh-conan-tap-1/anh-bia.jpg',
                  }}
                  style={styles.image}
                />
                <View style={styles.detail}>
                  <Text style={styles.text}>truyen conan tap 1</Text>
                  <Text style={styles.text}>$3000</Text>
                </View>
              </View>
              <View style={styles.quantity}>
                <Button
                  icon={{
                    name: 'minus',
                    type: 'font-awesome',
                    color: 'white',
                  }}
                  buttonStyle={{
                    backgroundColor: '#f9ccad',
                    padding: 0,
                  }}
                />

                <Text style={{ margin: 10 }}>1</Text>
                <Button
                  icon={{
                    name: 'plus',
                    type: 'font-awesome',
                    color: 'white',
                  }}
                  buttonStyle={{
                    backgroundColor: '#f9ccad',
                    padding: 0,
                  }}
                />
              </View>
            </View>
          </ListItem.Content>
        </ListItem.Swipeable>
      </View>
    </ScrollView>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: '500',
    color: '#c4c4c4',
  },
  imageLogoEmty: {
    height: 300,
    resizeMode: 'stretch',
    width: '100%',
  },
  text: {
    fontSize: 15,
    fontWeight: '500',
    textTransform: 'capitalize',
  },
  item: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  info: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  image: {
    width: 70,
    height: 80,
    resizeMode: 'stretch',
    borderRadius: 5,
  },
  detail: {
    flexDirection: 'column',
    flexWrap: 'wrap',
    marginLeft: 10,
    padding: 10,
  },
  quantity: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
