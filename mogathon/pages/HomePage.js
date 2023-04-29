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

export default function HomePage({ route, navigation }) {
    return (
        <TouchableOpacity style={styles.testing} >
			<View style={styles.container}>
            	<Text style={styles.text}>
					
            	</Text>
			</View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    testing: {
        width: '100%',
        height: '100%'
    },

	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	  },
	  text: {
		fontSize: 24,
		fontWeight: 'bold',
		color: 'red'
	  },
});