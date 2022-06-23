import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import LottieView from 'lottie-react-native';
import { useNavigation } from '@react-navigation/native';

const IntroScreen = () => {
  const nav = useNavigation()
  return (
    <View style={styles.container}>
      <LottieView 
        source={require('../assets/intro/93587-powerful-mind.json')}
        autoPlay
        loop={false}
        onAnimationFinish={() => nav.navigate('SignIn')}
      />
    </View>
  )
}

export default IntroScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
})