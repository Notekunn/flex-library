import { StyleSheet, View } from 'react-native';
import LottieView from 'lottie-react-native';
import React from 'react';
import { RootTabScreenProps } from '../types';

export default function IntroScreen({ navigation }: RootTabScreenProps<'Intro'>) {
  return (
    <View style={styles.container}>
      <LottieView
        source={require('../assets/intro/93587-powerful-mind.json')}
        autoPlay={true}
        loop={false}
        speed={1}
        onAnimationFinish={() => {
          navigation.navigate('SignIn');
        }}
      />
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
