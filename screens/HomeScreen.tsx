import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Search } from '../components/Home/SearchBar';
import SwipeSlide from '../components/Home/Carsousel';
import CardList from '../components/Home/CardList';
export default function HomeScreen() {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Search />
            </View>
            <View style={styles.body}>
                <SwipeSlide />
                <CardList />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        marginTop: 30,
    },
    body: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
});
