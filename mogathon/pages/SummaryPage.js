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

export default function SummaryPage({ route, navigation }) {
    return (
        <TouchableOpacity style={styles.testing} >
			<ScrollView style={styles.scrollView}>
            	<Text>
                	{summText}
            	</Text>
			</ScrollView>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    testing: {
        width: '100%',
        height: '100%'
    },
	scrollView: {
		backGroundColor: 'white',
		marginHorizontal: 20
	},
	text: {
		fontSize:18
	}
});