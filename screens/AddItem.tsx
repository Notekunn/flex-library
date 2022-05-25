import { Alert, Button, Modal, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { mainColor, seconColor, whiteColor } from '../constants/Colors';
import { Entypo } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
const AddItem = () => {
  const navigation = useNavigation();
  const [status, requestPermission] = ImagePicker.useCameraPermissions();
  const [image, setImage] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
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
    await setModalVisible(!modalVisible);
    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
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
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
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
      <View style={styles.content}>
        <View style={styles.addImage}>
          <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
            <View style={styles.frameAdd}>
              <Text style={{ color: mainColor, fontWeight: 'bold' }}>Add Picture</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default AddItem;

const styles = StyleSheet.create({
  container: { flex: 1 },
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
    overflow: 'hidden',
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
});
