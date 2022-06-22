import React from 'react';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
const GoogleMap = () => {
  return (
    <View>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 20.980194953622984,
          longitude: 105.79615346430842,
          latitudeDelta: 0.001,
          longitudeDelta: 0.001,
        }}
      >
        <Marker
          coordinate={{ latitude: 20.980194953622984, longitude: 105.79615346430842 }}
          title={'Thư Viện KMA'}
          description={'Cửa hàng sách'}
        />
      </MapView>
    </View>
  );
};

export default GoogleMap;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: Dimensions.get('window').width,
    height: '100%',
  },
});
