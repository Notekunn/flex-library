import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';
import React from 'react';
const { width, height } = Dimensions.get('window');
const CarsouselItem = ({ imageUrl }: any) => {
    return (
        <View style={styles.cardView}>
            <Image style={styles.image} source={{ uri: imageUrl }} />
        </View>
    );
};

const styles = StyleSheet.create({
    image: {
        width: width - 20,
        height: height / 4,
        borderRadius: 5,
        resizeMode: 'stretch',
    },
    cardView: {
        flex: 1,
        width: width - 20,
        height: height / 4,
        margin: 10,
        borderRadius: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0.5, height: 0.5 },
        shadowOpacity: 0.5,
        shadowRadius: 3,
        elevation: 5,
    },
});

export default CarsouselItem;
