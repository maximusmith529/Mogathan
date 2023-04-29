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
    let summ = route.params.summary;
    return (
		<View style={styles.container}>
			<View style={styles.header}>
                <TouchableOpacity style={styles.backBtnContainer} onPress={() => { navigation.navigate('UploadImage') }}>
                    <Image style={styles.backBtnImage} source={require('../assets/back-button.png')} />
                </TouchableOpacity>
            </View>
			<View style={styles.body}>
				<ScrollView style={styles.scrollView}>
					<Text>
						{summ}
					</Text>
				</ScrollView>
			</View>
			
			{/* <View style={styles.btnCont}>
				<TouchableOpacity style={styles.touchableOpacity}
				onPress={() => {alert('Put GPT command here')}}>
					<Text styles={styles.btnText}>
						Simplify
					</Text>
				</TouchableOpacity>
				<TouchableOpacity style={styles.touchableOpacity}
				onPress={() => {alert('Put GPT command here')}}>
					<Text styles={styles.btnText}>
						Example
					</Text>
				</TouchableOpacity>
				<TouchableOpacity style={styles.touchableOpacity}
				onPress={() => {alert('Put GPT command here')}}>
					<Text styles={styles.btnText}>
						Continue
					</Text>
				</TouchableOpacity>
			</View> */}

			<View style={styles.btnCont}>
				<View style={styles.btns}>
					<Pressable onPress={() => {alert('Need GPT Simplify function')}} style={styles.btnText}>
						<Text>
							Simplify
						</Text>
					</Pressable>

					<Pressable onPress={() => {alert('Need GPT Example function')}} style={styles.btnText}>
						<Text>
							Example
						</Text>
					</Pressable>

					<Pressable onPress={() => {alert('Need GPT Continue function')}} style={styles.btnText}>
						<Text>
							Continue
						</Text>
					</Pressable>
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
	},
	touchableOpacity: {
		position: 'absolute',
		height: 50,
		width: 50,
		alignItems: 'center',
		justifyContent: 'center',
		bottom: 30,
		
	},
	btnCont: {
		position: 'absolute',
		alignItems: 'center',
		bottom: 20
	},
	btns: {
		flex: 'row',
		backgroundColor: '#e0f2fe',
		width: '90%',
		justifyContent: 'space-evenly',
		borderRadius: 40
	},
	btnText: {
		fontSize: 18,
		color: 'white'
	}
});