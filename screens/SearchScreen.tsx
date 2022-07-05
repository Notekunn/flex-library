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
} from 'react-native';
import React, { createRef, useRef, useState } from 'react';
import { Entypo, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { mainColor } from '../constants/Colors';
import { useAppDispatch, useAppSelector } from '../app/hook';
import { SearchBookAction, selectBook } from '../reducers/bookSlice';
import { IBook } from '../constants/interface';
const { width } = Dimensions.get('window');

const SearchScreen = () => {
  const navigation = useNavigation<any>();
  const dispatch = useAppDispatch();
  const dataSearch = useAppSelector(selectBook);
  const [query, setQuery] = useState('');
  const [data, setData] = useState<IBook[]>([]);

  let timeout = useRef<any>(null);

  const handleChange = (text: string) => {
    setQuery(text);
    timeout.current = setTimeout(() => {
      handleSubmit(text);
    }, 300);
  };

  const handleSubmit = (query: string) => {
    dispatch(
      SearchBookAction({
        query,
        sort: 'name:asc',
        page: 1,
        take: 10,
      }),
    );
    setData(dataSearch);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={true}>
      <View style={styles.container}>
        <View style={styles.header_top}>
          <View style={{ position: 'relative', alignItems: 'center' }}>
            <TextInput
              onChangeText={(text) => handleChange(text)}
              value={query}
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
              placeholder="Bạn đang tìm kiếm tri thức phải không ?"
            />
            <View style={{ position: 'absolute', right: 10, bottom: 20 }}>
              <TouchableOpacity onPress={() => navigation.navigate('ResultSearch', data)}>
                <FontAwesome5 name="search" color={mainColor} size={15} />
              </TouchableOpacity>
            </View>
          </View>
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
        {!data.length ? (
          <View>
            <View style={styles.list}>
              <View style={styles.title_box}>
                <Text style={styles.title}>Tìm kiếm phổ biến</Text>
              </View>
              <View style={styles.listItem}>
                {Array.from(Array(10)).map((e, i) => {
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
                      key={i}
                    >
                      <Text
                        style={{
                          width: width / 2,
                        }}
                      >
                        Bí kíp qua môn Android
                      </Text>
                    </View>
                  );
                })}
              </View>
            </View>
            <View style={styles.list}>
              <View style={styles.title_box}>
                <Text style={styles.title}>Danh mục</Text>
              </View>
              <View style={styles.listItem}>
                {Array.from(Array(10)).map((e, i) => {
                  return (
                    <TouchableOpacity key={i}>
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
                          Sách CNTT
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
                  );
                })}
              </View>
            </View>
          </View>
        ) : (
          <View>
            <View style={styles.listResult}>
              {data.map((item, index) => (
                <TouchableOpacity key={index} onPress={() => navigation.push('Item', item)}>
                  <View style={styles.itemResult}>
                    <Text>{item.name}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default SearchScreen;

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
  listResult: {
    backgroundColor: '#FFF',
    flexDirection: 'column',
  },
  itemResult: {
    borderWidth: 0.2,
    borderColor: '#E5E6F8',
    padding: 10,
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
});
