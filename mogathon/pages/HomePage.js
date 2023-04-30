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

// Page allows uploading of image and navigation to further pages
export default function HomePage({ route, navigation }) {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.morgan} onPress={() => { navigation.navigate('HomePage') }}>
                    <Image style={styles.morganImage} source={require('../assets/logo-black-and-yellow.png')} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.helpContainer} onPress={() => { navigation.navigate('HelpPage') }}>
                    <Text style={styles.helpText}>?</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.body}>
                <TouchableOpacity style={styles.button} onPress={() => { navigation.navigate('UploadImage') }}>
                    <Text style={styles.buttonText}>Upload Images</Text>
                </TouchableOpacity>
            </View>
            <Text style={styles.text}>

            </Text>
        </View>
    )
}

// CSS styling for contents of page
const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#e0f2fe'
    },
    header: {
        flexDirection: 'row',
        height: 70,
        width: '100%',
        alignItems: 'flex-end',
        paddingHorizontal: 20,
        justifyContent: 'flex-end',
    },
    morgan: {
        width: 140,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    morganImage: {
        width: '100%',
        height: '70%',
        resizeMode: 'contain'
    },
    helpContainer: {
        paddingLeft: 90,
    },
    helpText: {
        color: '#e2d546',
        fontWeight: '900',
        fontSize: 50
    },
    body: {
        height: '85%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingBottom: 75,
    },
    button: {
        width: '85%',
        padding: 10,
        backgroundColor: '#e2d546',
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
});
