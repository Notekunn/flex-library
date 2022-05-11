import React, { FC, useState } from 'react';
import { SearchBar } from '@rneui/themed';
import { View, Text, StyleSheet } from 'react-native';

type PropResult = {
    listItem: string[];
};

export const ResultSearch: FC<PropResult> = ({ listItem }) => {
    return (
        <View style={styles.view}>
            <View style={styles.listItem}>
                {listItem.map((item, index) => {
                    return (
                        <View key={index} style={styles.item}>
                            <Text>{item}</Text>
                        </View>
                    );
                })} 
            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    view: {
        width: '100%',
    },
    listItem: {
        display: 'flex',
        flexDirection: 'column',
        paddingLeft: 30,
        paddingRight: 30,
        backgroundColor: '#fff',
        marginLeft: 10,
        marginRight: 10,
        borderRadius: 5,
        boxShadow: '0px 0px 30px rgba(0, 0, 0, 0.1)',
    },
    item: {
        paddingTop: 15,
        paddingBottom: 15,
        borderColor: '#f0f0f0',
        borderBottomWidth: 1,
    },
});
