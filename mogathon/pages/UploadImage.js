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
import DropDownPicker from 'react-native-dropdown-picker';

export default function UploadImage({ route, navigation }) {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
        { label: 'English', value: 'english' },
        { label: 'Spanish', value: 'spanish' },
        { label: 'Creole', value: 'creole' },
    ]);

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

            </View>
            <View style={styles.footer}>
                <View>
                    <TouchableOpacity style={styles.button} onPress={() => { navigation.navigate('UploadImage') }}>
                        <Text style={styles.buttonText}>Upload Image</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <TouchableOpacity style={styles.button} onPress={() => { navigation.navigate('SummaryPage') }}>
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
        marginTop: 15,
        alignItems: 'flex-end',
        justifyContent: 'space-evenly',
        paddingHorizontal: 20,
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
