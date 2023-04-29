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
        <View style={styles.container}>
			<View style={styles.header}>
				<Text>
					Help Page
				</Text>
			</View>

			<View style={styles.body}>
				<ScrollView style={styles.scrollView}>
					<Text>
					What is Morgan & Morgan Mate?
						Morgan & Morgan Mate is a legal documentation assistant application made to assist 
						the average person to make sense of complicated and wordy legal documents
					</Text>
				</ScrollView>
			</View>
	    </View>
    )
}

const styles = StyleSheet.create({
    header: {
        width: '100%',
        height: '100%'
    }
});