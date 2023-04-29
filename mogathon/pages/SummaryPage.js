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
		<view style={styles.container}>
			<View style={styles.header}>
                <TouchableOpacity style={styles.backBtnContainer} onPress={() => { navigation.navigate('UploadImage') }}>
                    <Image style={styles.backBtnImage} source={require('../assets/back-button.png')} />
                </TouchableOpacity>
            </View>
			<View style={styles.body}>
				<ScrollView style={styles.scrollView}>
					<Text>
						{summText}
					</Text>
				</ScrollView>
			</View>
		</view>
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
        height: '10%',
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
        height: '80%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        paddingBottom: 75,
    },
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