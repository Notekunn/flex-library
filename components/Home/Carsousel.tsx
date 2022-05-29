import { Dimensions, StyleSheet, View, Text, Image, FlatList, Animated } from 'react-native'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Directions, FlingGestureHandler, State } from 'react-native-gesture-handler'

// import CarsouselItem from './CarsouselItem';
const { width, height } = Dimensions.get('window')
const listImage = [
  'https://tuoitho.mobi/upload/truyen/tham-tu-lung-danh-conan-tap-1/anh-bia.jpg',
  'https://tuoitho.mobi/upload/truyen/tham-tu-lung-danh-conan-tap-2/anh-bia.jpg',
  'https://tuoitho.mobi/upload/truyen/tham-tu-lung-danh-conan-tap-3/anh-bia.jpg',
  'https://tuoitho.mobi/upload/truyen/tham-tu-lung-danh-conan-tap-4/anh-bia.jpg',
  'https://tuoitho.mobi/upload/truyen/tham-tu-lung-danh-conan-tap-5/anh-bia.jpg',
]
const OVERFLOW_HEIGHT = 70
const SPACING = 10
const ITEM_WIDTH = width * 0.6
const ITEM_HEIGHT = ITEM_WIDTH * 1.6
const VISIBLE_ITEM = 3
const SwipeSlide = () => {
  // const scrollX = new Animated.Value(0);
  const scrollXIndex = useRef(new Animated.Value(0)).current
  const scrollXAnimated = useRef(new Animated.Value(0)).current
  const [dataList, setDataList] = React.useState(listImage)
  const position = Animated.divide(scrollXIndex, width)
  const flatListRef = useRef<FlatList>(null)
  const [index, setIndex] = useState(0)

  const setActiveIndex = useCallback((activeIndex) => {
    setIndex(activeIndex)
    scrollXIndex.setValue(activeIndex)
  }, [])
  useEffect(() => {
    Animated.spring(scrollXAnimated, {
      toValue: scrollXIndex,
      useNativeDriver: true,
    }).start()
    // setInterval(() => {
    //   scrollXIndex.setValue(Math.floor(Math.random() * listImage.length));
    // }, 1000);
    // setDataList(listImage);
    // infiniteScroll(dataList);
  })
  return (
    <FlingGestureHandler
      key="left"
      direction={Directions.LEFT}
      onHandlerStateChange={(ev) => {
        if (ev.nativeEvent.state === State.END) {
          if (index === listImage.length - 1) return
          setActiveIndex(index + 1)
        }
      }}
    >
      <FlingGestureHandler
        key="right"
        direction={Directions.RIGHT}
        onHandlerStateChange={(ev) => {
          if (ev.nativeEvent.state === State.END) {
            if (index === 0) return
            setActiveIndex(index - 1)
          }
        }}
      >
        <View style={styles.container}>
          <Text style={styles.title}>Sách nổi bật trong tuần</Text>
          {/* <Text style={styles.title}>Discover</Text> */}
          {/* <View style={styles.flatList}>
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
        /> */}

          <FlatList
            data={listImage}
            keyExtractor={(_, index) => String(index)}
            horizontal
            inverted
            contentContainerStyle={{
              flex: 1,
              justifyContent: 'center',
              top: -10,
              padding: SPACING * 2,
            }}
            scrollEnabled={false}
            removeClippedSubviews={false}
            CellRendererComponent={({ item, index, children, style, ...props }) => {
              const newStyle = [style, { zIndex: listImage.length - index }]
              return (
                <View style={newStyle} index={index} {...props}>
                  {children}
                </View>
              )
            }}
            renderItem={({ item, index }) => {
              const inputRange = [index - 1, index, index + 1]
              const translateX = scrollXAnimated.interpolate({
                inputRange,
                outputRange: [45, 0, -70],
              })
              const scale = scrollXAnimated.interpolate({
                inputRange,
                outputRange: [0.8, 1, 1.3],
              })
              const opacity = scrollXAnimated.interpolate({
                inputRange,
                outputRange: [1 - 1 / VISIBLE_ITEM, 1, 0],
              })
              return (
                <Animated.View
                  style={{
                    position: 'absolute',
                    left: -ITEM_WIDTH / 2,
                    opacity,
                    transform: [{ translateX }, { scale }],
                    shadowColor: '#000',
                    shadowOffset: { width: 0.5, height: 0.5 },
                    shadowOpacity: 0.5,
                    shadowRadius: 5,
                    elevation: 5,
                  }}
                >
                  <Image style={styles.image} source={{ uri: item }} />
                </Animated.View>
              )
            }}
          />

          {/* <View style={styles.dotView}>
            {listImage.map((_, index) => {
              const inputRange = [(index - 1) * width, index * width, (index + 1) * width];
              let dotWidth = scrollXIndex.interpolate({
                inputRange,
                outputRange: [10, 20, 10],
                extrapolate: 'clamp',
              });
              let opacity = scrollXIndex.interpolate({
                inputRange,
                outputRange: [0.3, 1, 0.3],
                extrapolate: 'clamp',
              });
              return (
                <Animated.View
                  key={String(index)}
                  style={{
                    width: 10,
                    opacity,
                    height: 10,
                    borderRadius: 5,
                    margin: 5,
                    backgroundColor: '#fff',
                  }}
                />
              );
            })}
          </View> */}
        </View>
      </FlingGestureHandler>
    </FlingGestureHandler>
  )
}
const styles = StyleSheet.create({
  container: {
    position: 'relative',
    height: 455,
    width: width,

    // backgroundColor: 'brown',

    // top: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
    top: 5,
  },
  dotView: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
    position: 'absolute',
    bottom: 60,
    left: 0,
    right: 0,
  },
  flatList: {
    flex: 1,
    position: 'relative',
    padding: 0,
  },
  cardView: {
    position: 'absolute',
    left: -ITEM_WIDTH / 2,
  },
  image: {
    width: ITEM_WIDTH,
    height: ITEM_HEIGHT,
    borderRadius: 20,
  },
})

export default SwipeSlide
