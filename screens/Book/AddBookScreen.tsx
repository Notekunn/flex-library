import {
  Alert,
  Button,
  FlatList,
  Image,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { mainColor, seconColor, whiteColor } from '../../constants/Colors';
import {
  AntDesign,
  Entypo,
  FontAwesome,
  Foundation,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { ScrollView } from 'react-native-gesture-handler';
import { useAppDispatch, useAppSelector } from '../../app/hook';
import { CreateBookAction } from '../../reducers/bookSlice';
import { uploadImage } from '../../app/cloudinary';
import { IBook } from '../../constants/interface';
import { RootStackScreenProps } from '../../types';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { AppRegex } from '../../constants/regex';
import { throttle } from 'lodash';

export const AddBookScreen: React.FC<RootStackScreenProps<'AddBook'>> = () => {
  const navigation = useNavigation<any>();
  const dispatch = useAppDispatch();
  const [status, requestPermission] = ImagePicker.useCameraPermissions();
  const [imageList, setImageList] = useState<string[]>([]);
  const [imageShowList, setImageShowList] = useState<string[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [name, setName] = useState('');
  const [author, setAuthor] = useState('');
  const [description, setDescription] = useState('');
  const [chooseCategories, setChooseCategories] = useState<number[]>([]);
  const [rentPrice, setRentPrice] = useState(0);
  const [salePrice, setSalePrice] = useState(0);
  const [numOfCopies, setNumOfCopies] = useState(0);
  const [modalBarCodeVisible, setModalBarCodeVisible] = useState(false);
  const [scanning, setScanning] = useState(true);
  const [barCode, setBarCode] = useState('');
  const onSubmit = () => {
    if (!name) {
      alert('Name is required');
      return;
    }
    if (!author) {
      alert('Author is required');
      return;
    }
    const data: Omit<IBook, 'id'> = {
      name,
      author,
      rentPrice,
      salePrice,
      images: imageList,
      categoryIds: chooseCategories,
      description,
      numOfCopies,
    };
    dispatch(CreateBookAction(data));
    navigation.navigate('Home');
  };

  // useEffect(() => {
  //   const check = async () => {
  //     if (status?.status !== 'granted') requestPermission();
  //   };
  //   check();
  // }, []);
  const pickImageWithCamera = async () => {
    // await requestPermission();
    if (status?.granted === false) {
      alert('No permission');
      return;
    }
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
      base64: true,
    });
    setModalVisible(!modalVisible);

    if (!result.cancelled) {
      const { secure_url: newImageUrl } = await uploadImage(result);
      // setImageShowList([...imageShowList, result.uri]);
      setImageList([...imageList, newImageUrl]);
    }
  };
  const pickImageWithGallery = async () => {
    setModalVisible(!modalVisible);
    // await requestPermission();
    if (status?.granted === false) {
      alert('Bạn chưa cấp quyền');
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
      base64: true,
    });
    if (!result.cancelled) {
      const { secure_url: newImageUrl } = await uploadImage(result);
      // setImageShowList([...imageShowList, result.uri]);
      setImageList([...imageList, newImageUrl]);
    }
  };
  interface ImageFrameProps {
    uri: any;
    index: number;
  }
  const deleteImage = (index: number) => {
    const result = imageList.filter((_: any, i: number) => i !== index);

    setImageList([...result]);
  };
  const ImageFrame: React.FC<ImageFrameProps> = ({ uri, index }) => {
    // const translateX = useSharedValue(0);
    // const translateY = useSharedValue(0);
    // const onPanGestureEvent = useAnimatedGestureHandler<PanGestureHandlerGestureEvent>({
    //   onActive: (event) => {
    //     translateX.value = event.translationX;
    //     translateY.value = event.translationY;
    //   },
    //   onEnd: () => {
    //     translateX.value = withSpring(0, { stiffness: 100 });
    //     translateY.value = withSpring(0, { stiffness: 100 });
    //   },
    // });
    // const rStyle = useAnimatedStyle(() => {
    //   return {
    //     transform: [{ translateX: translateX.value }, { translateY: translateY.value }],
    //   };
    // }, []);
    return (
      //       <PanGestureHandler onGestureEvent={onPanGestureEvent}>
      //         <Animated.View
      //           style={{
      //             width: 100,
      //             height: 100,
      //             justifyContent: 'center',
      //             alignItems: 'center',
      //             ...styles.frameImage,
      //             borderWidth: 0.6,
      //             borderColor: mainColor,
      //             ...rStyle,
      //           }}
      //         >
      //  </Animated.View>
      //       </PanGestureHandler>
      <View
        style={{
          width: 100,
          height: 100,
          justifyContent: 'center',
          alignItems: 'center',
          ...styles.frameImage,
          borderWidth: 0.6,
          borderColor: mainColor,
        }}
      >
        <TouchableOpacity
          style={{ position: 'absolute', top: 0, right: 0, zIndex: 10 }}
          onPress={() => {
            deleteImage(index);
          }}
        >
          <Ionicons
            name="md-close-circle"
            size={18}
            color="gray"
            // style={{ position: 'absolute', top: -9, right: -10, zIndex: 1 }}
          />
        </TouchableOpacity>
        <Image
          source={{ uri: uri }}
          style={{
            width: 80,
            resizeMode: 'contain',
            height: 80,
            position: 'relative',
          }}
        />
      </View>
    );
  };
  const handleBarCodeChange = ({ type, data }: Record<'type' | 'data', string>) => {
    console.log('Type: ' + type + ' | Data: ' + data);
    switch (type) {
      case BarCodeScanner.Constants.BarCodeType.ean13:
        setBarCode(data);
        setModalBarCodeVisible(false);
        break;
      case BarCodeScanner.Constants.BarCodeType.qr:
        console.log('Detected QR Code');
        if (!data.startsWith('flex-library:')) return;
        if (AppRegex.ORDER_CONFIRM.test(data)) {
          const [orderId] = data.match(/\d+/gi) as [string];
          setScanning(false);
          alert('Vui lòng quét mã BarCode !');
        }
        break;
    }
  };

  const handleBarCodeScanned = throttle(handleBarCodeChange, 1000);
  const ModalPopUp = () => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={{ flexDirection: 'row', width: 300 }}>
              <Text style={styles.modalText}>Get Picture from ?</Text>
            </View>
            <Pressable style={styles.modal_btn} onPress={pickImageWithCamera}>
              <Text>Camera Roll</Text>
            </Pressable>
            <Pressable style={[styles.modal_btn, { borderBottomWidth: 0.2 }]} onPress={pickImageWithGallery}>
              <Text>Gallery</Text>
            </Pressable>
            <Pressable style={[styles.button, styles.buttonClose]} onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.textStyle}>Cancel</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    );
  };
  const ModalBarCodePopUp = () => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalBarCodeVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalBarCodeVisible(!modalBarCodeVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.barcodebox}>
              <BarCodeScanner
                onBarCodeScanned={scanning ? handleBarCodeScanned : undefined}
                style={{ height: 300, width: 300 }}
              />
            </View>

            {!scanning && <Button title={'Scan again?'} onPress={() => setScanning(true)} color="tomato" />}
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalBarCodeVisible(!modalBarCodeVisible)}
            >
              <Text style={styles.textStyle}>Cancel</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    );
  };

  return (
    <View style={styles.container}>
      <ModalPopUp />
      <ModalBarCodePopUp />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Entypo name="chevron-left" size={35} color="white" />
        </TouchableOpacity>
        <Text
          style={{
            color: '#fff',
            fontSize: 20,
            fontWeight: 'bold',
            marginLeft: 120,
          }}
        >
          Thêm sách
        </Text>
      </View>

      <ScrollView>
        <View style={styles.content}>
          <View style={styles.addImage}>
            {/* {imageList.map((e: any, index: number) => {
            return <ImageFrame uri={e} index={index} />;
          })} */}
            <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
              <View style={[styles.frameAdd, styles.frameImage]}>
                <Text style={{ color: mainColor, fontWeight: 'bold' }}>Thêm ảnh</Text>
              </View>
            </TouchableOpacity>
            <FlatList
              data={imageList}
              horizontal={true}
              style={{ position: 'relative', flex: 1, height: 100 }}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item, index }) => <ImageFrame uri={item} index={index} />}
            />
          </View>
          <View style={styles.inputFrame}>
            <View style={styles.inputFrame_header}>
              <Text>Tên sách</Text>
              <Text>{name.length}/120</Text>
            </View>
            <TextInput
              style={styles.textInput}
              placeholder="Nhập tên sách"
              value={name}
              onChangeText={(value) => setName(value)}
            />
          </View>
          <View style={styles.inputFrame}>
            <View style={styles.inputFrame_header}>
              <Text>Tác giả</Text>
              <Text>{author.length}/120</Text>
            </View>
            <TextInput
              style={styles.textInput}
              placeholder="Nhập tên tác giả"
              value={author}
              onChangeText={(value) => setAuthor(value)}
            />
          </View>
          <View style={styles.inputFrame}>
            <View style={styles.inputFrame_header}>
              <Text>Mô tả về sách</Text>
              <Text>{description.length}/3000</Text>
            </View>
            <TextInput
              style={styles.textInput}
              placeholder="Tri thức có gì?"
              onChangeText={(value) => setDescription(value)}
              value={description}
            />
          </View>
          <View style={styles.optionFrame}>
            <TouchableOpacity
              onPress={() => navigation.navigate('Category', { chooseCategories, setChooseCategories })}
            >
              <View style={styles.optionItem}>
                <AntDesign
                  name="menu-fold"
                  size={24}
                  color={mainColor}
                  style={{ width: 30, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                />
                <Text style={{ minWidth: 200 }}>Danh mục</Text>
                {chooseCategories.length ? <Text style={{ flex: 1 }}>{chooseCategories.length} </Text> : <></>}
                <MaterialIcons
                  name="arrow-forward-ios"
                  size={24}
                  color="black"
                  style={{ position: 'absolute', right: 0, paddingRight: 10 }}
                />
              </View>
            </TouchableOpacity>
            <View style={styles.optionItem}>
              <MaterialCommunityIcons
                name="barcode-scan"
                size={24}
                color={mainColor}
                style={{ width: 30, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
              />
              <Text style={{ minWidth: 200 }}>Mã Bar-Code</Text>
              <Text style={{ flex: 1 }}>{barCode}</Text>
              <TouchableOpacity onPress={() => setModalBarCodeVisible(true)}>
                <FontAwesome name="camera-retro" size={24} color="black" style={{ paddingRight: 10 }} />
              </TouchableOpacity>
            </View>
            <View style={styles.optionItem}>
              <Foundation
                name="pricetag-multiple"
                size={24}
                color={mainColor}
                style={{ width: 30, alignItems: 'center', justifyContent: 'center' }}
              />
              <Text style={{ minWidth: 200 }}>Giá thuê</Text>
              <TextInput
                style={{ flexDirection: 'row', justifyContent: 'flex-end', flex: 1 }}
                keyboardType="number-pad"
                accessibilityElementsHidden={true}
                value={`${rentPrice}`}
                onChangeText={(value) => setRentPrice(+value || 0)}
              />
            </View>
            <View style={styles.optionItem}>
              <Foundation
                name="pricetag-multiple"
                size={24}
                color={mainColor}
                style={{ width: 30, alignItems: 'center', justifyContent: 'center' }}
              />
              <Text style={{ minWidth: 200 }}>Giá bán</Text>
              <TextInput
                style={{ flexDirection: 'row', justifyContent: 'flex-end', flex: 1 }}
                keyboardType="number-pad"
                accessibilityElementsHidden={true}
                value={`${salePrice}`}
                onChangeText={(value) => setSalePrice(+value || 0)}
              />
            </View>

            <View style={[styles.optionItem, styles.optionItemLast]}>
              <AntDesign
                name="dropbox"
                size={24}
                color={mainColor}
                style={{ width: 30, alignItems: 'center', justifyContent: 'center' }}
              />
              <Text style={{ padding: 10, minWidth: 100 }}>Số lượng</Text>
              <TextInput
                value={`${numOfCopies}`}
                keyboardType="number-pad"
                style={{ flexDirection: 'row', justifyContent: 'flex-end', marginLeft: 100, flex: 1 }}
                onChangeText={(value) => setNumOfCopies(+value || 0)}
              />
            </View>
          </View>
        </View>
      </ScrollView>
      <View style={styles.buttonFrame}>
        <TouchableOpacity onPress={onSubmit}>
          <View style={styles.submitBtn}>
            <Text>Lưu</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, position: 'relative' },

  header: {
    paddingHorizontal: 10,
    height: 90,
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 32,
    backgroundColor: mainColor,
  },
  content: { backgroundColor: seconColor, flex: 1 },
  addImage: {
    flexDirection: 'row',
    height: 150,
    justifyContent: 'flex-start',
    backgroundColor: whiteColor,
    alignItems: 'center',
    paddingHorizontal: 15,

    position: 'relative',
  },
  frameAdd: {
    borderWidth: 1.5,
    borderColor: mainColor,
    borderStyle: 'dashed',
    height: 100,
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },

  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(76, 76, 215, 0.1)',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 30,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },

    // overflow: 'hidden',

    width: 300,
    height: 220,
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    paddingHorizontal: 30,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
    marginTop: 12,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 18,
  },
  modalText: {
    height: 40,
    lineHeight: 40,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    justifyContent: 'center',
    width: '100%',
    color: whiteColor,

    backgroundColor: mainColor,
  },
  modal_btn: {
    height: 60,
    borderTopWidth: 0.2,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    // flex: 1,
    width: '100%',
  },

  frameImage: {
    marginRight: 10,
  },
  inputFrame: {
    marginTop: 10,
    backgroundColor: whiteColor,
    padding: 10,
  },
  inputFrame_header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 10,
  },
  textInput: {
    flex: 1,
    paddingTop: 5,
  },
  optionFrame: { marginTop: 10, backgroundColor: whiteColor, paddingHorizontal: 10 },
  optionItem: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
    borderBottomWidth: 0.2,
  },
  optionItemLast: {
    borderBottomWidth: 0,
  },
  buttonFrame: {
    bottom: 0,
    backgroundColor: whiteColor,
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10,
    alignItems: 'center',
  },
  submitBtn: {
    height: 50,
    width: 150,
    backgroundColor: mainColor,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  barcodebox: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 300,
    width: 300,
    overflow: 'hidden',
    borderRadius: 30,
    backgroundColor: 'tomato',
  },
});
