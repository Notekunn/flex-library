import { Dimensions, StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, Linking } from 'react-native';
import React, { useEffect, useState } from 'react';
import { RootStackScreenProps } from '../types';
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import BookList from '../components/Home/BookList';
import { mainColor } from '../constants/Colors';
import { IBook, OrderDetailAction } from '../constants/interface';
import SearchHeader from '../components/Header';
import { Button } from '@rneui/themed';
import { useAppDispatch, useAppSelector } from '../app/hook';
import { GetBookByIdAction, selectBook } from '../reducers/bookSlice';
import { UpdateOrderDetailAction } from '../reducers/orderSlice';
import { moneyFormat } from '../constants/Money';
import moment from 'moment';
import 'moment/locale/vi';
import SplashScreen from './SplashScreen';
import NotFoundScreen from './NotFoundScreen';
import { selectOwnStore } from '../reducers/authSlice';

const { width } = Dimensions.get('window');

const ItemScreen: React.FC<RootStackScreenProps<'Item'>> = ({ navigation, route }) => {
  const [showDetail, setShowDetail] = useState(false);
  const dispatch = useAppDispatch();
  const { id: bookId } = route.params;
  const isLoading = useAppSelector((state) => state.book.loading);
  const book = useAppSelector(selectBook);
  const ownStore = useAppSelector(selectOwnStore);
  const handlePress = async () => {
    if (book) {
      dispatch(UpdateOrderDetailAction({ bookId: book.id, quantity: 1, action: OrderDetailAction.ADD }));
    }
  };

  useEffect(() => {
    if (bookId) {
      dispatch(GetBookByIdAction(bookId));
    }
  }, [bookId]);

  if (isLoading === 'loading') return <SplashScreen />;
  if (isLoading === 'error' || !book) return <NotFoundScreen />;

  return (
    <View style={styles.container}>
      <SearchHeader />
      <ScrollView>
        <View style={{ marginTop: 10 }}>
          <Image style={styles.image} source={{ uri: book.images[0] }} />
        </View>
        <View style={styles.desc}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <View>
              <Text style={styles.title}>{book.name}</Text>
              <Text style={styles.price}>{moneyFormat(book.rentPrice)}/tuần</Text>
            </View>
            {ownStore && ownStore.id === book.store.id ? (
              <Button
                title={'Chỉnh sửa'}
                titleStyle={{ color: 'white' }}
                buttonStyle={{ backgroundColor: mainColor, marginRight: 10 }}
                onPress={() => {
                  navigation.navigate('EditBook', { book: book });
                }}
              />
            ) : (
              <Button
                title={book.numOfCopies > 0 ? 'Thuê ngay' : 'Hết hàng'}
                titleStyle={{ color: 'white' }}
                buttonStyle={{ backgroundColor: mainColor, marginRight: 10 }}
                disabled={book.numOfCopies <= 0}
                onPress={() => {
                  handlePress();
                }}
              />
            )}
          </View>
          <View style={styles.extensions}>
            <View style={styles.rate}>
              <AntDesign name="star" size={17} color="yellow" />
              <AntDesign name="star" size={17} color="yellow" />
              <AntDesign name="star" size={17} color="yellow" />
              <AntDesign name="star" size={17} color="yellow" />
              <AntDesign name="star" size={17} color="yellow" />
              <Text style={{ paddingLeft: 7, fontSize: 15 }}>5</Text>
            </View>
            <View style={styles.border}></View>
            <Text style={{ fontSize: 15 }}>Đã cho thuê {book.rentCount}</Text>
            <View style={styles.action}>
              <AntDesign name="hearto" size={25} color="gray" />
              <MaterialCommunityIcons style={{ marginLeft: 10 }} name="share-outline" size={35} color="gray" />
              <MaterialCommunityIcons
                style={{ marginLeft: 10 }}
                name="facebook-messenger"
                size={25}
                color="blue"
                onPress={() => Linking.openURL('https://www.facebook.com/dodac.lip')}
              />
            </View>
          </View>
        </View>
        <View style={styles.store}>
          <View style={styles.store_header}>
            <Image
              style={{
                height: 60,
                width: 60,
                resizeMode: 'contain',
                borderRadius: 30,
              }}
              source={{
                uri:
                  book?.store?.avatarURL ||
                  'https://tuoitho.mobi/upload/truyen/tham-tu-lung-danh-conan-tap-1/anh-bia.jpg',
              }}
            />
            <View style={styles.text}>
              <Text style={{ fontSize: 20 }}>{book.store.name}</Text>
              <Text style={{ fontSize: 12, color: 'gray' }}>Online 11 giờ trước</Text>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate('Store', book.store)}>
              <View style={styles.button}>
                <Text style={{ color: '#4C4CD7' }}>Xem Shop</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.store_bottom}>
            <View style={{ flexDirection: 'row', marginRight: 10 }}>
              <Text style={{ color: '#4C4CD7' }}>2,6k</Text>
              <Text>Sản phẩm</Text>
            </View>
            <View style={{ flexDirection: 'row', marginRight: 10 }}>
              <Text style={{ color: '#4C4CD7' }}>4,9</Text>
              <Text>Đánh giá</Text>
            </View>
            <View style={{ flexDirection: 'row', marginRight: 10 }}>
              <Text style={{ color: '#4C4CD7' }}>99%</Text>
              <Text>Phản hồi Chat</Text>
            </View>
          </View>
        </View>
        <BookList />
        <View style={styles.detail}>
          <View style={styles.detail_header}>
            <Text style={{ marginRight: 10 }}>Chi tiết sản phẩm</Text>
            <AntDesign name="clockcircleo" size={12} color="black" />
            <Text style={{ marginLeft: 7 }}>{moment(book.updatedAt).locale('vi').fromNow()}</Text>
          </View>
          <View style={styles.detail_center}>
            <View style={styles.detail_center_infor}>
              <Text style={{ width: 130 }}>Số lượng trong kho</Text>
              <Text style={{ flex: 1 }}>{book.numOfCopies}</Text>
            </View>
            <View style={styles.detail_center_infor}>
              <Text style={{ width: 130 }}>Thể loại</Text>
              {book.categories.map((category, i) => (
                <Text style={{ flex: 1 }} key={i}>
                  {category.name}
                </Text>
              ))}
            </View>
            <View style={styles.detail_center_infor}>
              <Text style={{ width: 130 }}>Tác giả</Text>
              <Text style={{ flex: 1 }}>{book.author || 'Đang cập nhật'}</Text>
            </View>
            <View style={styles.detail_center_infor}>
              <Text style={{ width: 130 }}>Xuất bản năm</Text>
              <Text style={{ flex: 1 }}>2000</Text>
            </View>
          </View>
          <View style={showDetail ? styles.detail_bottom_T : styles.detail_bottom_F}>
            <Text>{book.description || 'Chưa có mô tả sản phẩm'}</Text>
          </View>
          <TouchableOpacity onPress={() => setShowDetail(!showDetail)}>
            <View style={styles.detail_button}>
              {showDetail ? (
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text style={{ color: '#4C4CD7' }}>Thu gọn</Text>
                  <AntDesign name="up" size={20} color="#4C4CD7" />
                </View>
              ) : (
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text style={{ color: '#4C4CD7' }}>Xem thêm</Text>
                  <AntDesign name="down" size={20} color="#4C4CD7" />
                </View>
              )}
            </View>
          </TouchableOpacity>
          <View></View>
        </View>
        {/* <View style={styles.otherBooks}>
        {books.map((item, index) => (
          <BookCardFlex book={item} key={index} />
        ))}
      </View> */}
      </ScrollView>
    </View>
  );
};

export default ItemScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
  },
  image: {
    height: 400,
    width: width,
    resizeMode: 'contain',
  },
  title: {
    alignSelf: 'flex-start',
    fontSize: 23,
  },
  price: {
    alignSelf: 'flex-start',
    fontSize: 25,
    color: '#E74C3C',
    marginTop: 10,
  },
  extensions: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  rate: { flexDirection: 'row', alignItems: 'center' },
  border: {
    width: 1,
    height: 16,
    borderRightWidth: 1,
    marginHorizontal: 7,
  },
  action: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  desc: {
    backgroundColor: '#FADBD8',
    borderRadius: 10,
    marginHorizontal: 10,
    marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  store: {
    flexDirection: 'column',
    // alignItems: 'center',
    backgroundColor: '#FADBD8',
    borderRadius: 10,
    marginHorizontal: 10,
    marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  text: {
    flex: 1,
    fontSize: 20,
  },
  button: {
    borderWidth: 2,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
    borderColor: '#4C4CD7',
    borderRadius: 4,
  },
  store_header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  store_bottom: {
    flexDirection: 'row',
    marginTop: 10,
  },
  detail: {
    flex: 1,
    backgroundColor: '#FAD8',
    borderRadius: 10,
    marginHorizontal: 10,
    marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  detail_header: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 40,
    borderBottomWidth: 1,
    borderColor: 'gray',
    justifyContent: 'flex-start',
  },
  detail_center: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderColor: 'gray',
  },
  detail_bottom_F: {
    height: 100,
    overflow: 'hidden',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderColor: 'gray',
  },
  detail_bottom_T: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderColor: 'gray',
  },
  detail_center_infor: {
    flexDirection: 'row',
    height: 40,
    alignItems: 'center',
  },
  detail_button: {
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  otherBooks: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingTop: 10,
    justifyContent: 'space-between',
  },
});
