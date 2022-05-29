import { Dimensions, StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { RootStackScreenProps, RootTabScreenProps } from '../types';
import { AntDesign, Entypo, Feather, FontAwesome5, Fontisto, MaterialCommunityIcons } from '@expo/vector-icons';
import { stringLength } from '@firebase/util';
import BookList from '../components/Home/BookList';
import BookCardFlex from '../components/BookCardFlex';
import { mainColor } from '../constants/Colors';

const listImage = [
  'https://tuoitho.mobi/upload/truyen/tham-tu-lung-danh-conan-tap-1/anh-bia.jpg',
  'https://tuoitho.mobi/upload/truyen/tham-tu-lung-danh-conan-tap-2/anh-bia.jpg',
  'https://tuoitho.mobi/upload/truyen/tham-tu-lung-danh-conan-tap-3/anh-bia.jpg',
  'https://tuoitho.mobi/upload/truyen/tham-tu-lung-danh-conan-tap-4/anh-bia.jpg',
  'https://tuoitho.mobi/upload/truyen/tham-tu-lung-danh-conan-tap-5/anh-bia.jpg',
];

const arrTest = [];
const { width } = Dimensions.get('window');

const ItemScreen = ({ navigation }: RootStackScreenProps<'Item'>) => {
  const [showDetail, setShowDetail] = useState(false);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Entypo style={{ marginLeft: 10 }} name="chevron-left" size={35} color="#4C4CD7" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Search')}>
          <View
            style={{
              height: 30,
              width: 250,
              borderWidth: 1,
              paddingHorizontal: 8,
              alignItems: 'center',
              flexDirection: 'row',
              borderRadius: 10,
              // left: -30,
            }}
          >
            <FontAwesome5 name="search" size={16} color="gray" />
            <Text style={{ color: 'gray', marginLeft: 5 }}>Tìm kiếm trên FL</Text>
          </View>
        </TouchableOpacity>
        <View style={{ flexDirection: 'row', paddingLeft: 15 }}>
          <Fontisto style={{ marginHorizontal: 5 }} name="share-a" size={24} color="#4C4CD7" />
          <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
            <Feather style={{ marginHorizontal: 5 }} name="shopping-cart" size={24} color="#4C4CD7" />
          </TouchableOpacity>
          <Entypo style={{ marginLeft: 5 }} name="dots-three-vertical" size={24} color="#4C4CD7" />
        </View>
      </View>
      <ScrollView>
        <View>
          <Image style={styles.image} source={{ uri: listImage[0] }} />
        </View>
        <View style={styles.desc}>
          <Text style={styles.title}>Truyện tranh Connan version VIP pro MAX ULTRA WIDE</Text>
          <Text style={styles.price}>395.000đ</Text>
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
            <Text style={{ fontSize: 15 }}>Đã bán 2605</Text>
            <View style={styles.action}>
              <AntDesign name="hearto" size={25} color="gray" />
              <MaterialCommunityIcons style={{ marginLeft: 10 }} name="share-outline" size={35} color="gray" />
              <MaterialCommunityIcons style={{ marginLeft: 10 }} name="facebook-messenger" size={25} color="blue" />
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
              source={{ uri: listImage[1] }}
            />
            <View style={styles.text}>
              <Text style={{ fontSize: 20 }}>FlexLib.vip.vn</Text>
              <Text style={{ fontSize: 12, color: 'gray' }}>Online 11 giờ trước</Text>
            </View>
            <View style={styles.button}>
              <Text style={{ color: '#4C4CD7' }}>Xem Shop</Text>
            </View>
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
            <Text>4 tháng</Text>
          </View>
          <View style={styles.detail_center}>
            <View style={styles.detail_center_infor}>
              <Text style={{ width: 130 }}>Kho</Text>
              <Text style={{ flex: 1 }}>2605</Text>
            </View>
            <View style={styles.detail_center_infor}>
              <Text style={{ width: 130 }}>Loại sách</Text>
              <Text style={{ flex: 1 }}>Truyện màu</Text>
            </View>
            <View style={styles.detail_center_infor}>
              <Text style={{ width: 130 }}>Tác giả</Text>
              <Text style={{ flex: 1 }}>CLA</Text>
            </View>
            <View style={styles.detail_center_infor}>
              <Text style={{ width: 130 }}>Xuất bản năm</Text>
              <Text style={{ flex: 1 }}>2000</Text>
            </View>
          </View>
          <View style={showDetail ? styles.detail_bottom_T : styles.detail_bottom_F}>
            <Text>
              ✅ Sản phẩm arm nâng, tay nâng máy tính bảng, điện thoại (iPad, Galaxy Tab, Mi Pad, Kindle....) chân kẹp
              cố định vào mặt bàn, giúp mở rộng không gian cho bàn làm việc + vững hơn trên mặt bàn chiều cao giá đỡ
              lớn, linh hoạt hơn cho mọi nhu cầu và vị trí ✅ Độ dày của mặt bàn cần phù hợp độ rộng khe kẹp: - P60 PLus
              : dưới 6.4cm ✅ Kích thước tablet cần phù hợp với độ rộng của kẹp: - P60 PLUS: độ rộng kẹp 13 ~ 22cm (phù
              hợp tablet 4~12.9 inch) ✅ Chất liệu: hợp kim ✅ Trọng lượng: khoảng ~ 800 gram ✅ Có các khớp chỉnh góc
              tiện lợi, chắc chắn ✅ Đệm cao su chống trơn trượt và trầy xước máy tính bảng, điện thoại ✅ Kích thước:
              chi tiết hình đính kèm #giáđỡ #giáđỡlaptop #giáđỡipad #giáđỡmacbook #giáđỡtablet #giáđỡmáytínhbảng
            </Text>
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
        </View>
        <View style={styles.otherBooks}>
          {Array.from(Array(10)).map((_, index) => {
            return (
              <BookCardFlex
                key={index}
                url="https://tuoitho.mobi/upload/truyen/tham-tu-lung-danh-conan-tap-1/anh-bia.jpg"
              />
            );
          })}
        </View>
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
  header: {
    paddingTop: 50,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E5E6F8',
    paddingBottom: 10,
  },
});
