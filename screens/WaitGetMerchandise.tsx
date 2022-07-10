import {
  Alert,
  Dimensions,
  Image,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, { useState } from 'react';
import { mainColor, seconColor } from '../constants/Colors';
import { Button } from '@rneui/base';
import { moneyFormat } from '../constants/Money';
import { ScrollView } from 'react-native-gesture-handler';
const width = Dimensions.get('window').width;
const BookItem = () => {
  return (
    <View
      style={{
        marginHorizontal: 10,
        flexDirection: 'row',
        paddingTop: 10,
      }}
    >
      <Image
        source={{
          uri: 'https://tse1.mm.bing.net/th?q=solo%20leveling%20manga%20rock',
        }}
        style={styles.imageBook}
      />
      <View style={{ paddingHorizontal: 15 }}>
        <Text style={{ fontSize: 15 }}>Solo Leveling chapter 240</Text>
        <Text style={{ color: '#E74C3C', fontWeight: 'bold', paddingTop: 10 }}>{moneyFormat(123456)}</Text>
        <Text style={{ paddingTop: 10 }}>
          Số lượng <Text>05</Text>
        </Text>
      </View>
    </View>
  );
};
const WaitGetMachandiseItem = () => {
  const [modalDetailVisible, setModalDetailVisible] = useState(false);
  const [modalCodeVisible, setModalCodeVisible] = useState(false);
  return (
    <View style={styles.container}>
      <View style={styles.info}>
        <Image
          source={{
            uri: 'https://tse1.mm.bing.net/th?q=solo%20leveling%20manga%20rock',
          }}
          style={styles.imageLogoStore}
        />
        <View style={{ marginHorizontal: 15 }}>
          <Text style={styles.nameStore}>Wibu Store Book</Text>
          <View style={styles.infoDate}>
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ minWidth: 150 }}>Ngày thuê sách</Text>
              <Text style={styles.date}>10/07/2022</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ minWidth: 150 }}>Hạn trả sách</Text>
              <Text style={styles.date}>10/07/2022</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ minWidth: 150 }}>Số lượng</Text>
              <Text style={styles.date}>
                10 <Text>Quyển</Text>
              </Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ minWidth: 150, color: '#E74C3C', fontWeight: 'bold' }}>Tổng thanh toán</Text>
              <Text style={{ color: '#E74C3C', fontWeight: 'bold' }}>1,000,000 VND</Text>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.action}>
        <Button
          title={'Chi Tiết'}
          containerStyle={{}}
          buttonStyle={{
            width: 100,
            height: 40,
            borderRadius: 15,
            backgroundColor: '#AF7AC5',
          }}
          onPress={() => setModalDetailVisible(true)}
        />
        <Button
          title={'Mã QR'}
          containerStyle={{}}
          buttonStyle={{
            width: 100,
            height: 40,
            borderRadius: 15,
            backgroundColor: '#58D68D',
          }}
          onPress={() => setModalCodeVisible(true)}
        />
        {/* <Button
          title={'Hủy đơn'}
          containerStyle={{}}
          buttonStyle={{
            width: 100,
            height: 40,
            borderRadius: 15,
            backgroundColor: '#F1948A',
          }}
          //   onPress={btnCreateStore}
        /> */}
      </View>
      {/* <View style={styles.centeredView}> */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalCodeVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalDetailVisible(!modalCodeVisible);
        }}
      >
        <TouchableWithoutFeedback onPress={() => setModalCodeVisible(!modalCodeVisible)}>
          <View style={styles.centeredView}>
            <View style={styles.modalCodeView}>
              <Image
                source={{
                  uri: 'https://printgo.vn/uploads/media/790919/tao-ma-qr-code-san-pham-1_1620927223.jpg',
                }}
                style={styles.imageQRCode}
              />
            </View>
            {/* <Pressable style={[styles.button, styles.buttonClose]} onPress={() => setModalCodeVisible(!modalCodeVisible)}>
            <Text style={styles.textStyle}>Đóng </Text>
          </Pressable> */}
          </View>
        </TouchableWithoutFeedback>
      </Modal>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalDetailVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalDetailVisible(!modalDetailVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Image
              source={{
                uri: 'https://tse1.mm.bing.net/th?q=solo%20leveling%20manga%20rock',
              }}
              style={styles.imageLogoStoreBook}
            />
            <Text style={{ alignSelf: 'center', fontSize: 25, fontWeight: 'bold' }}>Wibu Store Book</Text>
            <View style={styles.booksList}>
              <ScrollView style={{ maxHeight: 370 }}>
                <BookItem />
                <BookItem />
                <BookItem />
                <BookItem />
                <BookItem />
              </ScrollView>
            </View>
            <View style={{ marginHorizontal: 10, marginVertical: 10 }}>
              <View style={styles.infoDate}>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={{ minWidth: 150 }}>Ngày thuê sách</Text>
                  <Text style={styles.date}>10/07/2022</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={{ minWidth: 150 }}>Hạn trả sách</Text>
                  <Text style={styles.date}>10/07/2022</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={{ minWidth: 150 }}>Số lượng</Text>
                  <Text style={styles.date}>
                    10 <Text>Quyển</Text>
                  </Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={{ minWidth: 150, color: '#E74C3C', fontWeight: 'bold' }}>Tổng thanh toán</Text>
                  <Text style={{ color: '#E74C3C', fontWeight: 'bold' }}>1,000,000 VND</Text>
                </View>
              </View>
            </View>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalDetailVisible(!modalDetailVisible)}
            >
              <Text style={styles.textStyle}>Đóng </Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      {/* </View> */}
    </View>
  );
};

export default function WaitGetMachandise() {
  return (
    <View>
      <WaitGetMachandiseItem />
      <WaitGetMachandiseItem />
      <WaitGetMachandiseItem />
    </View>
  );
}

const styles = StyleSheet.create({
  imageQRCode: {
    height: 200,
    width: 200,
    borderRadius: 20,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  imageLogoStoreBook: {
    alignSelf: 'center',
    height: 100,
    width: 100,
    borderRadius: 50,
  },
  booksList: {},
  imageBook: {
    width: 70,
    height: 80,
    resizeMode: 'stretch',
    borderRadius: 5,
  },
  container: {
    backgroundColor: seconColor,
    height: 170,
    marginHorizontal: 20,
    borderRadius: 15,
    marginTop: 15,
  },
  imageLogoStore: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  info: {
    marginHorizontal: 15,
    marginTop: 10,
    flexDirection: 'row',
  },
  nameStore: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  action: {
    flexDirection: 'row',
    marginHorizontal: 15,
    marginTop: 10,
    justifyContent: 'space-around',
  },
  infoDate: {},
  date: {},
  ////////modal
  centeredView: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    // marginTop: 22,
  },
  modalView: {
    // margin: 20,
    width: width - 40,
    // marginHorizontal: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 10,
    // alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalCodeView: {
    height: 250,
    width: 250,
    backgroundColor: mainColor,
    borderRadius: 20,
    // paddingHorizontal: 10,
    // paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
