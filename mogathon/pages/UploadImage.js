import { StatusBar } from 'expo-status-bar';
import React, { useRef, useState, useEffect } from 'react';
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
    FlatList
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import DropDownPicker from 'react-native-dropdown-picker';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import Constants from 'expo-constants';

// Processes the sending of images to Google Vision API
export default function UploadImage({ route, navigation }) {
    const [nextPressed, setNextPressed] = useState(false);
    const [selectedValue, setSelectedValue] = useState('English');
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [images, setImages] = useState([]);
    const [imageText, setImageText] = useState('');

    const [selectedIndex, setSelectedIndex] = useState(0);

    const { width } = Dimensions.get('window');
    const itemWidth = width;

    const spinAnim = useRef(new Animated.Value(0)).current;

	// Plays loading animation
    Animated.loop(
        Animated.timing(spinAnim, {
            toValue: 4,
            duration: 10000,
            useNativeDriver: true,
        })
    ).start();

    const spin = spinAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    });

    const renderItem = ({ item, index }) => {
        return (
            <View style={{ flex: 1, width: itemWidth }}>
                <Image
                    source={{ uri: item.source }}
                    style={{ flex: 1, alignSelf: 'center', width: '90%', height: '90%' }}
                    resizeMode="contain"
                />
            </View>
        );
    };

	// Gets an image from user device
    const getImageFromLib = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: await ImagePicker.MediaTypeOptions.All,
            //allowsEditing: true,
        });
        if (result !== null) {
            const newImage = { source: result.assets[0].uri };
            const newImages = [...images, newImage];
            setImages(newImages);
        }
    };

	// Asks for permission to then open device's camera for taking images
    const openCamera = async () => {
        // Ask the user for the permission to access the camera
        const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

        if (permissionResult.granted === false) {
            alert("You've refused to allow this appp to access your camera!");
            return;
        }

        const result = await ImagePicker.launchCameraAsync();

        // Explore the result
        console.log(result);

        if (!result.canceled) {
            const newImage = {
                source:
                    result.assets[0].uri
            };
            const newImages = [...images, newImage];
            setImages(newImages);
        }
    }
	// Gives functionality to nect button, navigating forward after uploading images
    const handleNextButton = async () => {
        setNextPressed(true);
        let fullString = "";
        console.log(images);
        for (const uri of images) {
            console.log(uri.source);
            const base64 = await FileSystem.readAsStringAsync(uri.source, { encoding: 'base64' });
            const response = await fetch('https://vision.googleapis.com/v1/images:annotate?key=' + Constants?.manifest?.extra?.visionKey, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    requests: [
                        {
                            image: {
                                content: base64
                            },
                            features: [
                                {
                                    type: "TEXT_DETECTION"
                                }
                            ]
                        }
                    ]
                })
            });
            const data = await response.json();

            //console.log(data.responses[0].fullTextAnnotation.text)
            fullString = fullString + data.responses[0].fullTextAnnotation.text;
        }
        setImageText(fullString);
        return await useGPT(fullString)
    }

	// Prompts GPT with provided text and receives summary of provided document
    const useGPT = async (prompt) => {
        const API_ENDPOINT = "https://api.openai.com/v1/chat/completions";
        const API_KEY = Constants?.manifest?.extra?.openAiKey

        console.log(API_KEY);

        const response = await fetch(API_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${API_KEY}`
            },
            body: JSON.stringify({
                model: "gpt-4",
                max_tokens: 128,
                messages: [{ role: "system", content: "You are an assistant to the law firm Morgan & Morgan. Your job is to help describe the user's text prompt in layman's terms. Their prompt will usually include legal documents or terms. If it is a legal document try to summarize as concisely and as short as possible." },
                { role: "user", content: prompt+". Please respond in the "+selectedValue+" language" },],
                temperature: 1,
                n: 1,
                stop: '\n'
            })
        });

        const data = await response.json();
        console.log(data.choices[0].message.content)
        return data.choices[0].message.content;
    }

    const handleSelectImage = (index) => {
        setSelectedIndex(index);
    };
    if (nextPressed) {
        return (
            <View style={styles.container}>
                <Animated.Image
                    style={[styles.loadingImg, { transform: [{ rotate: spin }] }]}
                    source={require('../assets/loading-icon.png')}
                />
            </View>
        );
    }
	// Renders page onto the screen with proper component ordering and styling
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.backBtnContainer} onPress={() => { navigation.navigate('HomePage') }}>
                    <Image style={styles.backBtnImage} source={require('../assets/back-btn.png')} />
                </TouchableOpacity>
                <View style={styles.dropdownContainer}>
                    <Picker
                        selectedValue={selectedValue}
                        onValueChange={(itemValue, itemIndex) =>
                            setSelectedValue(itemValue)
                        }
                    >
                        <Picker.Item label="English" value="English" />
                        <Picker.Item label="Spanish" value="Spanish" />
                        <Picker.Item label="Creole" value="Haitian Creole" />
                    </Picker>
                </View>
            </View>
            <View style={styles.body}>
                <View style={images.length === 0 ? { flex: 1, backgroundColor: '#b5c1d4',  } : { flex: 1 }}>
                    <FlatList
                        data={images}
                        horizontal
                        pagingEnabled
                        //style={styles.list}
                        renderItem={renderItem}
                        onMomentumScrollEnd={(event) => {
                            const index = Math.floor(
                                event.nativeEvent.contentOffset.x /
                                event.nativeEvent.layoutMeasurement.width
                            );
                            handleSelectImage(index);
                        }}
                    />
                    {images.length !== 0 && (<View style={{ position: 'absolute', bottom: -20, alignSelf: 'center' }}>
                        <Text>{`Selected: ${selectedIndex + 1} of ${images.length}`}</Text>
                    </View>)}
                </View>
            </View>
            <View style={styles.footer}>
                <View>
                    <TouchableOpacity style={styles.button} onPress={() => { getImageFromLib() }}>
                        <Image style={styles.backBtnImage} source={require('../assets/upload-image-btn.png')} />
                    </TouchableOpacity>
                </View>
                <View>
                    <TouchableOpacity style={styles.button} onPress={() => { openCamera() }}>
                        <Image style={styles.backBtnImage} source={require('../assets/camera.png')} />
                    </TouchableOpacity>
                </View>
                <View>
                    <TouchableOpacity style={styles.button} onPress={async () => {
                        var hold = await handleNextButton();
                        console.log("TEXT:" + hold);
                        setNextPressed(false);
                        navigation.navigate('SummaryPage', {lang:selectedValue, summary: hold, fullTextString: imageText });
                    }}>
                        <Image style={styles.backBtnImage} source={require('../assets/foward-btn.png')} />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

// Styling for page components
const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        width: '100%',
        height: '100%',
        alignItems: 'flex-end',
        justifyContent: 'center',
        backgroundColor: '#e0f2fe'
    },
    header: {
        flexDirection: 'row',
        height: '10%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'flex-end',
        bottom: '1%',
        // backgroundColor: 'black'
    },
    backBtnContainer: {
        // justifyContent: 'center'
    },
    backBtnImage: {
        width: 50,
        // height: 50,
        // resizeMode: 'contain'
    },
    dropdownContainer: {
        width: '80%',
        paddingLeft: '45%',
        top:"20%",
        justifyContent: 'center',
    },
    dropdown: {
        width: '100%'
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
    list: {
        // display: 'flex',
        // flexDirection: 'row',
        // alignSelf: 'center',
        // height: '90%',
        // width: '90%',
        // //objectFit: 'contain',
        // paddingBottom: 75,
    },
    button: {
        width: '100%',
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        borderRadius: 10,
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
    footer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        height: '10%',
        width: '100%',
        paddingHorizontal: 20,
        backgroundColor: '#254f94'
    },
    loadingImg: {
        alignSelf: 'center',
        width: 100,
        height: 100,
        marginBottom: 20
    }
});