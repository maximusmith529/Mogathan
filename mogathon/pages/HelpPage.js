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

// Renders page with helpful information about application
// Prints out helpful info in Question/Answer format
export default function HelpPage({ route, navigation }) {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.backBtnContainer} onPress={() => { navigation.navigate('HomePage') }}>
                    <Image style={styles.backBtnImage} source={require('../assets/back-btn.png')} />
                </TouchableOpacity>
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

// Styling for page components, including specific styles for questions and answers
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
        height: '5%',
        width: '100%',
        justifyContent: 'flex-start',
        alignItems: 'flex-end'
    },
    body: {
        height: '85%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    scrollView: {
        height: '100%',
        width: '95%'
    },
    question: {
        width: '90%',
        fontSize: 24,
        fontWeight: 'bold',
        color: 'black',
    },
    answer: {
        fontSize: 20,
        color: 'black'
    }
});