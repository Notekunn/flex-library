import { StyleSheet, Text, View, Image } from 'react-native';
import React from 'react';
import { Button, Icon } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';

const CartScreen = () => {
    const nav = useNavigation();
    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.title}>Your Shopping cart is empty</Text>
            </View>
            <View
                style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '100%',
                    marginTop: 20,
                    marginBottom: 20,
                }}
            >
                <Image
                    source={{
                        uri: 'https://cdni.iconscout.com/illustration/premium/thumb/empty-cart-2130356-1800917.png',
                    }}
                    style={styles.imageEmty}
                />
            </View>
            <Button
                title="Shoping now"
                buttonStyle={{ backgroundColor: '#f84b2f' }}
                containerStyle={{
                    marginHorizontal: 50,
                    marginVertical: 20,
                    borderRadius: 15,
                }}
                titleStyle={{
                    color: 'white',
                    marginHorizontal: 20,
                    fontSize: 20,
                }}
                onPress={() => {
                    nav.navigate('Home');
                }}
            />
        </View>
    );
};

export default CartScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: '500',
        color: '#c4c4c4',
    },
    imageEmty: {
        height: 300,
        resizeMode: 'stretch',
        width: '100%',
    },
});
