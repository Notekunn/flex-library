import React, { useState } from 'react';
import { SearchBar } from '@rneui/themed';
import { View, Text, StyleSheet } from 'react-native';
import { ResultSearch } from './ResultSearch';

type SearchBarComponentProps = {};

const listItem = [''];

export const Search: React.FunctionComponent<SearchBarComponentProps> = () => {
    const [search, setSearch] = useState('');

    const updateSearch = (search: string) => {
        setSearch(search);
    };

    return (
        <View style={styles.view}>
            <SearchBar
                placeholder="Search"
                onChangeText={updateSearch}
                value={search}
                containerStyle={{
                    backgroundColor: '#fff',
                    borderRadius: 5,
                    margin: 10,
                    borderBottomColor: 'transparent',
                    borderTopColor: 'transparent',
                }}
                inputContainerStyle={{
                    backgroundColor: '#fff',
                }}
                inputStyle={{
                    color: '#000',
                    fontSize: 16,
                }}
                searchIcon={{
                    color: '#000',
                    size: 25,

                }}
            />
            {/* {listItem && <ResultSearch listItem={listItem} />} */}
        </View>
    );
};
const styles = StyleSheet.create({
    view: {
        width: '100%',
    },
});
