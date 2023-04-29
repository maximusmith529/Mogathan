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

export default function HelpPage({ route, navigation }) {
    return (
        <TouchableOpacity style={styles.testing} >
            <Text>
                Help Page
            </Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    testing: {
        width: '100%',
        height: '100%'
    }
});