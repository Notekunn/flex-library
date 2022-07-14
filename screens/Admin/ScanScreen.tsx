import { Alert, Button, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { BarCodeScanner } from 'expo-barcode-scanner';
import throttle from 'lodash/throttle';
import { AppRegex } from '../../constants/regex';
import { RootStackScreenProps } from '../../types';

const ScanScreen: React.FC<RootStackScreenProps<'Root'>> = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState<boolean>();
  const [scanning, setScanning] = useState(true);

  const askForCameraPermission = () => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  };

  // Request Camera Permission
  useEffect(() => {
    askForCameraPermission();
  }, []);

  const handleBarCodeChange = ({ type, data }: Record<'type' | 'data', string>) => {
    console.log('Type: ' + type + ' | Data: ' + data);
    switch (type) {
      case BarCodeScanner.Constants.BarCodeType.qr:
        console.log('Detected QR Code');
        if (!data.startsWith('flex-library:')) return;
        if (AppRegex.ORDER_CONFIRM.test(data)) {
          const [orderId] = data.match(/\d+/gi) as [string];
          setScanning(false);
          Alert.alert('Redirect', 'Do you want to redirect to order confirm page?', [
            {
              text: 'Yes',
              onPress: () => {
                navigation.navigate('OrderConfirm', { orderId: +orderId });
              },
            },
            {
              text: 'No',
              onPress: () => {
                setScanning(true);
              },
            },
          ]);
        }
        break;
    }
  };

  const handleBarCodeScanned = throttle(handleBarCodeChange, 1000);

  // Check permissions and return the screens
  if (hasPermission === null) {
    return (
      <View style={styles.container}>
        <Text>Requesting for camera permission</Text>
      </View>
    );
  }
  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text style={{ margin: 10 }}>No access to camera</Text>
        <Button title={'Allow Camera'} onPress={() => askForCameraPermission()} />
      </View>
    );
  }

  // Return the View
  return (
    <View style={styles.container}>
      <View style={styles.barcodebox}>
        <BarCodeScanner
          onBarCodeScanned={scanning ? handleBarCodeScanned : undefined}
          style={{ height: 400, width: 400 }}
        />
      </View>

      {!scanning && <Button title={'Scan again?'} onPress={() => setScanning(true)} color="tomato" />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  maintext: {
    fontSize: 16,
    margin: 20,
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

export default ScanScreen;
