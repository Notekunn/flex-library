import { Button, StyleSheet, Text, View } from 'react-native';
import { Icon, Image } from '@rneui/themed';
import React from 'react';

const AccountScreen = () => {
    return (
        <View style={styles.container}>
            <View
                style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column',
                    marginTop: 50,
                }}
            >
                <Image
                    source={{
                        uri: 'https://bloganchoi.com/wp-content/uploads/2021/08/avatar-vit-vang-trend-15.jpg',
                    }}
                    style={styles.avatar}
                />
                <View>
                    <Text style={styles.text}>Vit vang</Text>
                </View>
            </View>
            <View style={{ padding: 10 }}>
                <View>
                    <Text style={styles.title}>Account</Text>
                    <View style={styles.listItem}>
                        <View style={styles.item}>
                            <View
                                style={{
                                    backgroundColor: '#00ff0885',
                                    borderRadius: 5,
                                    padding: 5,
                                    width: 30,
                                    height: 30,
                                }}
                            >
                                <Icon
                                    name="user"
                                    type="font-awesome"
                                    size={20}
                                    color="#fff"
                                    solid={true}
                                />
                            </View>

                            <View
                                style={{
                                    flex: 2,
                                    marginLeft: 30,
                                }}
                            >
                                <Text style={styles.text}>Profile</Text>
                            </View>
                            <Icon
                                name="angle-right"
                                type="font-awesome"
                                color="#c1c1c1"
                            />
                        </View>
                        <View style={styles.item}>
                            <View
                                style={{
                                    backgroundColor: '#ff000085',
                                    borderRadius: 5,
                                    padding: 5,
                                    width: 30,
                                    height: 30,
                                }}
                            >
                                <Icon
                                    name="heart"
                                    type="font-awesome"
                                    color="#fff"
                                    size={20}
                                    solid={true}
                                />
                            </View>
                            <View
                                style={{
                                    flex: 2,
                                    marginLeft: 30,
                                }}
                            >
                                <Text style={styles.text}>Like</Text>
                            </View>
                            <Icon
                                name="angle-right"
                                type="font-awesome"
                                style={{ flex: 1 }}
                                color="#c1c1c1"
                            />
                        </View>
                        <View style={styles.item}>
                            <View
                                style={{
                                    backgroundColor: '#ff00e885',
                                    borderRadius: 5,
                                    padding: 5,
                                    width: 30,
                                    height: 30,
                                }}
                            >
                                <Icon
                                    name="bell"
                                    type="font-awesome"
                                    color="#fff"
                                    size={20}
                                    solid={true}
                                />
                            </View>
                            <View
                                style={{
                                    flex: 2,
                                    marginLeft: 30,
                                }}
                            >
                                <Text style={styles.text}>Notification</Text>
                            </View>
                            <Icon
                                name="angle-right"
                                type="font-awesome"
                                style={{ flex: 1 }}
                                color="#c1c1c1"
                            />
                        </View>
                    </View>
                </View>
                <View>
                    <Text style={styles.title}>Orther</Text>
                    <View style={styles.listItem}>
                        <View style={styles.item}>
                            <View
                                style={{
                                    backgroundColor: '#f6ff1182',
                                    borderRadius: 5,
                                    padding: 5,
                                    width: 30,
                                    height: 30,
                                }}
                            >
                                <Icon
                                    name="life-ring"
                                    type="font-awesome"
                                    color="#fff"
                                    size={20}
                                />
                            </View>
                            <View
                                style={{
                                    flex: 2,
                                    marginLeft: 30,
                                }}
                            >
                                <Text style={styles.text}>Help & Feedback</Text>
                            </View>
                            <Icon
                                name="angle-right"
                                type="font-awesome"
                                color="#c1c1c1"
                            />
                        </View>
                        <View style={styles.item}>
                            <View
                                style={{
                                    backgroundColor: '#cbcbcb82',
                                    borderRadius: 5,
                                    padding: 5,
                                    width: 30,
                                    height: 30,
                                }}
                            >
                                <Icon
                                    name="log-out"
                                    type="feather"
                                    color="#fff"
                                    size={20}
                                />
                            </View>
                            <View
                                style={{
                                    flex: 2,
                                    marginLeft: 30,
                                }}
                            >
                                <Text style={styles.text}>Logout</Text>
                            </View>
                            <Icon
                                name="angle-right"
                                type="font-awesome"
                                style={{ flex: 1 }}
                                color="#c1c1c1"
                            />
                        </View>
                    </View>
                </View>
            </View>
        </View>
    );
};

export default AccountScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    avatar: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 100,
        width: 100,
        resizeMode: 'stretch',
        borderRadius: 50,
    },
    title: {
        fontSize: 18,
        fontWeight: '600',
        marginTop: 10,
        marginBottom: 10,
        color: '#c1c1c1',
    },
    listItem: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    item: {
        flexDirection: 'row',
        padding: 10,
        backgroundColor: '#fff',
        borderBottomColor: '#ccc',
        borderBottomWidth: 0.8,
        alignItems: 'center',
        width: '100%',
        justifyContent: 'space-around',
    },
    text: {
        fontSize: 16,
        fontWeight: '500',
        color: '#858585',
        flexWrap: 'wrap',
    },
});
