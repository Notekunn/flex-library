import {
  Dimensions,
  StyleSheet,
  View,
  Text,
  FlatList,
  Animated,
} from 'react-native';
import React, { useEffect, useRef } from 'react';
import CarsouselItem from './CarsouselItem';
const { width, height } = Dimensions.get('window');
const listImage = [
  'https://tuoitho.mobi/upload/truyen/tham-tu-lung-danh-conan-tap-1/anh-bia.jpg',
  'https://tuoitho.mobi/upload/truyen/tham-tu-lung-danh-conan-tap-2/anh-bia.jpg',
  'https://tuoitho.mobi/upload/truyen/tham-tu-lung-danh-conan-tap-3/anh-bia.jpg',
];

const SwipeSlide = () => {
  const [dataList, setDataList] = React.useState(listImage);
  const scrollX = new Animated.Value(0);
  const position = Animated.divide(scrollX, width);
  const flatListRef = useRef<FlatList>(null);
  // const infiniteScroll = (dataList: any) => {
  //     const numberOfData = dataList.length;
  //     let scrollValue = 0;
  //     let scrolled = 0;
  //     setInterval(() => {
  //         scrolled = scrolled + 1;
  //         if (scrolled < numberOfData) {
  //             scrollValue = scrollValue + width;
  //         } else {
  //             scrolled = 0;
  //             scrollValue = 0;
  //         }

  //         flatListRef.current?.scrollToOffset({
  //             animated: true,
  //             offset: scrollValue,
  //         });
  //     }, 3000);
  // };
  useEffect(() => {
    setDataList(listImage);
    // infiniteScroll(dataList);
  });
  return (
    <View style={styles.container}>
      {/* <Text style={styles.title}>Discover</Text> */}
      <View style={styles.flatList}>
        <FlatList
          ref={flatListRef}
          data={listImage}
          horizontal={true}
          keyExtractor={(item, index) => index.toString()}
          pagingEnabled
          scrollEnabled
          snapToAlignment='center'
          decelerationRate={0.8}
          scrollEventThrottle={16}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => {
            return <CarsouselItem imageUrl={item} />;
          }}
          onScroll={Animated.event([
            { nativeEvent: { contentOffset: { x: scrollX } } },
          ])}
        />
        <View style={styles.dotView}>
          {listImage.map((_, index) => {
            let opacity = position.interpolate({
              inputRange: [index - 1, index, index + 1],
              outputRange: [0.3, 1, 0.3],
              extrapolate: 'clamp',
            });
            return (
              <Animated.View
                key={index}
                style={{
                  opacity,
                  height: 10,
                  width: 10,
                  borderRadius: 5,
                  margin: 5,
                  backgroundColor: '#fff',
                }}
              />
            );
          })}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    height: 300,
    width: 200,
    backgroundColor: 'brown',

    top: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  dotView: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
  },
  flatList: {
    flex: 1,
    position: 'relative',
    padding: 0,
  },
});

export default SwipeSlide;
