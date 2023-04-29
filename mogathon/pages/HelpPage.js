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
					<Text style={styles.question}>
						What is Morgan & Morgan Mate? {'\n'}
					</Text>
					<Text style={styles.answer}>
						{'\t'} Morgan & Morgan Mate is a legal documentation assistant application 
						made to assist the average person to make sense of complicated and wordy 
						legal documents. {'\n'}
					</Text>
					<Text style={styles.question}>
						{'\n'}How does Morgan & Morgan Mate Work?{'\n'}
					</Text>
					<Text style={styles.answer}>
						{'\t'} Morgan & Morgan Mate uses the latest developments in cutting edge AI 
						technologies to read the provided legal document images and produce a well 
						crafted synopsis and explanation of the contains within said document. {'\n'}
					</Text>
					<Text style={styles.question}>
						{'\n'} How do I use Morgan and Morgan Mate?{'\n'}
					</Text>
					<Text style={styles.answer}>
						{'\t'} All one has to do to use Morgan and Morgan Mate is either upload 
						existing images from their device or select the option to take new photos. 
						Once the desired images are uploaded, the application will produce a synopsis 
						of the legal documents within the provided images. Users will then have the 
						ability to get more information about their documents or even ask questions 
						relating to the contents of the document.{'\n'}
					</Text>
				</ScrollView>
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
        backgroundColor: 'white'
    },
    header: {
        backgroundColor: 'black',
        height: '15%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'flex-end',
		fontSize: 30,
		alignItems: 'center'
    },
    helpContainer: {
        paddingRight: 25
    },
    helpText: {
        color: 'white',
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
	question: {
		fontSize: 24,
		fontWeight: 'bold',
		color: 'black',
	},
	answer: {
		fontSize: 20,
		color: 'black'
	}
});