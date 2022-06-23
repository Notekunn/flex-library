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
import { mainColor, seconColor, whiteColor } from '../constants/Colors';
import { AntDesign, Entypo, Foundation, Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { PanGestureHandler, PanGestureHandlerGestureEvent, ScrollView } from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  withSpring,
  useAnimatedStyle,
  useAnimatedGestureHandler,
} from 'react-native-reanimated';

const AddItem = () => {
  const navigation = useNavigation<any>();
  const [status, requestPermission] = ImagePicker.useCameraPermissions();
  const [imageList, setImageList] = useState<any>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [name, setName] = useState('');
  const [author, setAuthor] = useState('');
  const [desc, setDesc] = useState('');
  const [rentPrice, setRentPrice] = useState(0);
  const [salePrice, setSalePrice] = useState(0);
  const [quantity, setQuantity] = useState(0);

  const onSubmit = () => {
    if (!name) {
      alert('Name is required');
      return;
    }
    if (!author) {
      alert('Author is required');
      return;
    }
    if (!desc) {
      alert('Description is required');
      return;
    }
    const data = {
      name,
      author,
      desc,
      rentPrice,
      salePrice,
      quantity,
      images: imageList,
    }
    console.log(data);
  }


  const [category, setCategory] = useState<number[]>([]);
  // useEffect(() => {
  //   const check = async () => {
  //     if (status?.status !== 'granted') requestPermission();
  //   };
  //   check();
  // }, []);
  const pickImageWithCamera = async () => {
    console.log('âsas');
    // await requestPermission();
    // if (status?.granted === false) {
    //   alert('you ko có permissions');
    //   return;
    // }
    let result = await ImagePicker.launchCameraAsync({
      // mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    setModalVisible(!modalVisible);
    console.log(result);

    if (!result.cancelled) {
      setImageList([...imageList, result.uri]);
    }
  };
  const pickImageWithGallery = async () => {
    setModalVisible(!modalVisible);
    // await requestPermission();
    if (status?.granted === false) {
      alert('you ko có permissions');
      return;
    }
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,

      aspect: [9, 3],
      quality: 1,
      allowsMultipleSelection: true,
    });

    console.log(result);

    if (!result.cancelled) {
      setImageList([...imageList, result]);
    }
  };
  interface ImageFrameProps {
    uri: any;
    index: number;
  }
  const deleteImage = (index: number) => {
    const result = imageList.filter((_: any, i: number) => i !== index);
    console.log(index);

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

  return (
    <View style={styles.container}>
      <ModalPopUp />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Entypo name="chevron-left" size={35} color="white" />
        </TouchableOpacity>
        <Text
          style={{
            color: '#fff',
            fontSize: 20,
            fontWeight: 'bold',
            marginLeft: 100,
          }}
        >
          Thêm sản phẩm
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
                <Text style={{ color: mainColor, fontWeight: 'bold' }}>Add Picture</Text>
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
            <TextInput style={styles.textInput} placeholder="Nhập tên sách" onChangeText={(value) => setName(value)} />
          </View>
          <View style={styles.inputFrame}>
            <View style={styles.inputFrame_header}>
              <Text>Tác giả</Text>
              <Text>{name.length}/120</Text>
            </View>
            <TextInput style={styles.textInput} placeholder="Nhập tên tác giả" onChangeText={(value) => setAuthor(value)} />
          </View>
          <View style={styles.inputFrame}>
            <View style={styles.inputFrame_header}>
              <Text>Mô tả về sách</Text>
              <Text>{desc.length}/3000</Text>
            </View>
            <TextInput
              style={styles.textInput}
              placeholder="Tri thức có gì?"
              onChangeText={(value) => setDesc(value)}
            />
          </View>
          <View style={styles.optionFrame}>
          <TouchableOpacity onPress={()=> navigation.navigate("Category",{category,setCategory})}>
            <View style={styles.optionItem}>
                <AntDesign
                  name="menu-fold"
                  size={24}
                  color={mainColor}
                  style={{ width: 30, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                />
                <Text style={{ padding: 10 }}>Danh mục</Text>
                {category.length ? <Text style={{marginLeft:150}}>{category.length} </Text> : <></>}
                <MaterialIcons
                  name="arrow-forward-ios"
                  size={24}
                  color="black"
                  style={{ position: 'absolute', right: 0 }}
                />
            </View>
          </TouchableOpacity>
            <View style={styles.optionItem}>
              <Foundation
                name="pricetag-multiple"
                size={24}
                color={mainColor}
                style={{ width: 30, alignItems: 'center', justifyContent: 'center' }}
              />
              <Text style={{ padding: 10, minWidth: 100 }}>Giá thuê</Text>
              <TextInput
                 placeholder={`${rentPrice}`}
                style={{ flexDirection: 'row', justifyContent: 'flex-end', marginLeft: 100, flex: 1 }}
                keyboardType="number-pad"
                accessibilityElementsHidden={true}
                onChangeText={(value) => setRentPrice(parseInt(value))}
              />
            </View>
            <View style={styles.optionItem}>
              <Foundation
                name="pricetag-multiple"
                size={24}
                color={mainColor}
                style={{ width: 30, alignItems: 'center', justifyContent: 'center' }}
              />
              <Text style={{ padding: 10, minWidth: 100 }}>Giá bán</Text>
              <TextInput
                placeholder={`${salePrice}`}
                style={{ flexDirection: 'row', justifyContent: 'flex-end', marginLeft: 100, flex: 1 }}
                keyboardType="number-pad"
                accessibilityElementsHidden={true}
                onChangeText={(value) => setSalePrice(parseInt(value))}
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
                placeholder={`${quantity}`}
                keyboardType="number-pad"
                style={{ flexDirection: 'row', justifyContent: 'flex-end', marginLeft: 100, flex: 1 }}
                onChangeText={(value) => setQuantity(parseInt(value))}
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
export default AddItem;

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
    borderRadius: 20,
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
    padding:10,
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
});
