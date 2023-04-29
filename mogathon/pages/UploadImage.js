import { StatusBar } from 'expo-status-bar';
import React, { useRef, useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    Image,
    TextInput,
    Pressable,
    TouchableOpacity,
    ImageBackground,
    Dimensions,
    Animated,
} from 'react-native';

export default function UploadImage({ route, navigation }) {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.backBtnContainer} onPress={() => { navigation.navigate('HomePage') }}>
                    <Image style={styles.backBtnImage} source={require('../assets/back-button.png')} />
                </TouchableOpacity>
            </View>
            <View style={styles.body}>
                <View>
                    <TouchableOpacity style={styles.button} onPress={() => { navigation.navigate('UploadImage') }}>
                        <Text style={styles.buttonText}>Upload Image</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <TouchableOpacity style={styles.button} onPress={() => { navigation.navigate('SummaryPage') }}>
                        <Text style={styles.buttonText}>Next</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'grey'
    },
    header: {
        backgroundColor: 'black',
        height: '15%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'flex-start'
    },
    backBtnContainer: {
        paddingLeft: 25
    },
    backBtnImage: {
        width: 40,
        height: 40
    },
    body: {
        display: 'flex',
        flexDirection: 'row',
        height: '85%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        paddingBottom: 75,
    },
    button: {
        width: '100%',
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: '40',
        alignItems: 'center',
        color: 'white',
        borderRadius: 15,
        shadowColor: '#000',
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    buttonText: {
        fontSize: 25,
        fontWeight: 'bold',
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'red'
    },
});
