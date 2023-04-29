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
import DropDownPicker from 'react-native-dropdown-picker';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import Constants from 'expo-constants';

export default function UploadImage({ route, navigation }) {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
        { label: 'English', value: 'english' },
        { label: 'Spanish', value: 'spanish' },
        { label: 'Creole', value: 'creole' },
    ]);
    const [images, setImages] = useState([]);

    const [selectedIndex, setSelectedIndex] = useState(0);

    const { width } = Dimensions.get('window');
    const itemWidth = width;

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

    const getImageFromLib = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: await ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
        });
        if (result !== null) {
            const newImage = { source: result.assets[0].uri };
            const newImages = [...images, newImage];
            setImages(newImages);
        }
    };

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
    const handleNextButton = async () => {
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
       return await useGPT(fullString)
    }

const useGPT = async(prompt) => {
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
        model:"gpt-4",
        max_tokens: 128,
        messages: [{role: "system", content: "You are an assistant to the law firm Morgan & Morgan. Your job is to help describe the user's text prompt in layman's terms. Their prompt will usually include legal documents or terms. If it is a legal document try to summarize as concisely and as short as possible."},
                {role: "user", content: prompt}],
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
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.backBtnContainer} onPress={() => { navigation.navigate('HomePage') }}>
                    <Image style={styles.backBtnImage} source={require('../assets/back-btn.png')} />
                </TouchableOpacity>
                <View style={styles.dropdownContainer}>
                    <DropDownPicker style={styles.dropdown}
                        open={open}
                        value={value}
                        items={items}
                        setOpen={setOpen}
                        setValue={setValue}
                        setItems={setItems}
                    />
                </View>
            </View>
            <View style={styles.body}>
                <View style={{ flex: 1 }}>
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
                        <Text style={styles.buttonText}>Upload Image</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <TouchableOpacity style={styles.button} onPress={() => { openCamera() }}>
                        <Text style={styles.buttonText}>Take a Photo</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <TouchableOpacity style={styles.button} onPress={async() => {
                        var hold = await handleNextButton();
                        console.log("TEXT:"+hold);
                        navigation.navigate('SummaryPage', {summary:hold});
                    }}>
                        <Text style={styles.buttonText}>Next</Text>
                    </TouchableOpacity>
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
        backgroundColor: '#e0f2fe'
    },
    header: {
        flexDirection: 'row',
        height: 70,
        width: '100%',
        justifyContent: 'center',
        top: "2%",
        alignItems: 'flex-start'
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
        paddingLeft: '40%',
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
        backgroundColor: '#fff',
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
});
