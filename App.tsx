import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import { store } from './app/store';
import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';
import { RootSiblingParent } from 'react-native-root-siblings';

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();
  let [fontsLoaded] = useFonts({
    SansPro: require('./assets/fonts/SourceSansPro-SemiBold.ttf'),
    SansProLight: require('./assets/fonts/SourceSansPro-Light.ttf'),
    SansProRegular: require('./assets/fonts/SourceSansPro-Regular.ttf'),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }
  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <Provider store={store}>
        <SafeAreaProvider>
          <RootSiblingParent>
            <Navigation colorScheme={colorScheme} />
            <StatusBar hidden />
          </RootSiblingParent>
        </SafeAreaProvider>
      </Provider>
    );
  }
}
