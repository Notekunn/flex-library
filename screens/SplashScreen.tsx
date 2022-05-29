import { StyleSheet, View } from 'react-native';
import React from 'react';
import { RootTabScreenProps } from '../types';
import { Text } from '../components/Themed';

//TODO: make spinner
export default function SplashScreen({ navigation }: RootTabScreenProps<'Splash'>) {
  return (
    <View style={styles.container}>
      <Text>SplashScreen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
