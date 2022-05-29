import {
  Dimensions,
  Image,
  Keyboard,
  NativeSyntheticEvent,
  StyleSheet,
  Text,
  TextInput,
  TextInputChangeEventData,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native'
import React, { createRef, useRef, useState } from 'react'
import { Entypo, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { mainColor } from '../constants/Colors'
const { width } = Dimensions.get('window')
const SearchScreen = () => {
  const navigation = useNavigation()
  const [inputChange, setInputChange] = useState(true)
  const [searchText, setSearchText] = useState('')
  const [firstInput, setFirstInput] = useState(true)
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={true}>
      <View style={styles.container}>
        <View style={styles.header_top}>
          {/* <Entypo
          onPress={() => navigation.goBack()}
          style={{ flex: 1, marginLeft: 10 }}
          name="chevron-left"
          size={35}
          color="#4C4CD7"
        /> */}

          <TextInput
            onChangeText={(value) => {
              if (firstInput) {
                setInputChange(false)
                setFirstInput(false)
              } else if (!firstInput) {
                if (value == '') {
                  setFirstInput(true)
                  setInputChange(true)
                }
              }
              setSearchText(value)
            }}
            value={searchText}
            style={{
              height: 30,
              width: 320,
              paddingHorizontal: 8,
              backgroundColor: '#fff',
              alignItems: 'center',
              flexDirection: 'row',
              borderRadius: 10,
              // left: -30,
            }}
            placeholder="Bạn đang tìm kiếm tri thức phải không ?"
          >
            {/* <FontAwesome5 name="search" size={16} color="gray" />
            <Text style={{ color: 'gray', marginLeft: 5 }}>Tìm kiếm trên FL</Text> */}
          </TextInput>

          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text
              style={{
                flexDirection: 'row',
                marginTop: 8,
                fontSize: 15,
                color: '#fff',
                fontWeight: 'bold',
              }}
            >
              Thoát
            </Text>
          </TouchableOpacity>
        </View>
        {inputChange ? (
          <View>
            <View style={styles.list}>
              <View style={styles.title_box}>
                <Text style={styles.title}>Tìm kiếm phổ biến</Text>
              </View>
              <View style={styles.listItem}>
                {Array.from(Array(10)).map((e) => {
                  return (
                    <View
                      style={{
                        width: width / 2,
                        paddingHorizontal: 15,
                        justifyContent: 'center',
                        alignContent: 'center',
                        height: 50,
                        borderWidth: 0.2,
                      }}
                    >
                      <Text
                        style={{
                          width: width / 2,
                        }}
                      >
                        Hướng dẫn cách đạp vịt
                      </Text>
                    </View>
                  )
                })}
              </View>
            </View>
            <View style={styles.list}>
              <View style={styles.title_box}>
                <Text style={styles.title}>Danh mục</Text>
              </View>
              <View style={styles.listItem}>
                {Array.from(Array(10)).map((e) => {
                  return (
                    <TouchableOpacity>
                      <View
                        style={{
                          width: width / 2,
                          paddingHorizontal: 15,
                          justifyContent: 'center',
                          alignItems: 'center',
                          height: 50,
                          borderWidth: 0.2,
                          flexDirection: 'row',
                        }}
                      >
                        <Text
                          style={{
                            flex: 1,
                          }}
                        >
                          Cách từ chối sát kèo để đi ĐẠP VỊT{' '}
                        </Text>
                        <Image
                          style={{
                            height: 40,
                            width: 40,
                            borderRadius: 10,
                            resizeMode: 'stretch',
                          }}
                          source={{
                            uri: 'https://paddlewheeler.com/wp-content/uploads/2019/08/090419-paddle-wheeler-paddle-wheeler-84.jpg',
                          }}
                        />
                      </View>
                    </TouchableOpacity>
                  )
                })}
              </View>
            </View>
          </View>
        ) : (
          <Text></Text>
        )}
      </View>
    </TouchableWithoutFeedback>
  )
}

export default SearchScreen

const styles = StyleSheet.create({
  header_top: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    backgroundColor: mainColor,
    // alignItems: 'center',
    paddingTop: 50,
    height: 100,
  },
  container: {
    backgroundColor: '#E5E6F8',
    flex: 1,
  },
  list: {
    marginTop: 10,
    backgroundColor: '#FFF',
  },
  listItem: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  title_box: {
    paddingHorizontal: 15,
    height: 40,

    borderBottomWidth: 0.2,
    borderColor: 'gray',
    justifyContent: 'center',
  },
  title: {
    fontSize: 15,
    fontWeight: 'bold',
  },
})
