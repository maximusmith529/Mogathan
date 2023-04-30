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
    KeyboardAvoidingView,
    Platform,
} from 'react-native';
// SummaryPage.js

const SummaryPage = ({ route, navigation }) => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const scrollViewRef = useRef();

    const handleContentSizeChange = () => {
        scrollViewRef.current.scrollToEnd({ animated: true });
    };

    let summary = route.params?.summary;
    useEffect(() => {
        if (summary) {
            setMessages([{ text: summary, sender: 'bot' }]);
        }
    }, [summary]);

    const handleSend = () => {
        if (newMessage.trim() !== '') {
            setMessages([...messages, { text: newMessage, sender: 'user' }]);
            setNewMessage('');
        }
    };
    const renderMessage = (message, index) => {
        const isUser = message.sender === 'user';
        const messageStyle = isUser ? styles.userMessage : styles.botMessage;
        const textStyle = isUser ? styles.userMessageText : styles.botMessageText;
        return (
            <View key={index} style={[styles.messageContainer, { alignSelf: isUser ? 'flex-end' : 'flex-start' }]}>
                <View style={[styles.messageBubble, messageStyle]}>
                    <Text style={textStyle}>{message.text}</Text>
                </View>
            </View>
        );
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 25}
        >
            <View style={styles.header}>
                <TouchableOpacity style={styles.backBtnContainer} onPress={() => { navigation.navigate('HomePage') }}>
                    <Image style={styles.backBtnImage} source={require('../assets/back-btn.png')} />
                </TouchableOpacity>
            </View>
            <ScrollView
                ref={scrollViewRef}
                style={styles.scrollView}
                onContentSizeChange={handleContentSizeChange}>
                <View style={styles.chatContainer}>
                    {messages.map(renderMessage)}
                </View>
            </ScrollView>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.textInput}
                    placeholder="Type a message"
                    value={newMessage}
                    onChangeText={(text) => setNewMessage(text)}
                />
                <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
                    <Text style={styles.sendButtonText}>Send</Text>
                </TouchableOpacity>
            </View>

        </KeyboardAvoidingView>
    );
};

export default SummaryPage;

// export default function SummaryPage({ route, navigation }) {
//     return (
// 		<view style={styles.container}>
// 			<View style={styles.header}>
//                 <TouchableOpacity style={styles.backBtnContainer} onPress={() => { navigation.navigate('UploadImage') }}>
//                     <Image style={styles.backBtnImage} source={require('../assets/back-button.png')} />
//                 </TouchableOpacity>
//             </View>
// 			<View style={styles.body}>
// 				<ScrollView style={styles.scrollView}>
// 					<Text>
// 						{summText}
// 					</Text>
// 				</ScrollView>
// 			</View>
// 		</view>
//     )
// }

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
        height: '10%',
        width: '100%',
        justifyContent: 'flex-start',
        alignItems: 'flex-end',
    },
    backBtnContainer: {
        paddingLeft: 25,
    },
    backBtnImage: {
        width: 50,
    },
    chatContainer: {
        flex: 1,
        paddingHorizontal: 10,
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
        paddingHorizontal: 10,
        paddingVertical: 5,

    },
    testing: {
        width: '100%',
        height: '100%'
    },
    sendButton: {
        backgroundColor: '#254f94',
        borderRadius: 20,
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    sendButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    chatContainer: {
        flex: 1,
        paddingHorizontal: 10,
      },
      messageContainer: {
        marginVertical: 5,
      },
      messageBubble: {
        borderRadius: 20,
        paddingVertical: 10,
        paddingHorizontal: 15,
        maxWidth: '80%',
      },
      userMessage: {
        backgroundColor: '#2196F3',
        alignSelf: 'flex-end',
      },
      botMessage: {
        backgroundColor: '#F5F5F5',
        alignSelf: 'flex-start',
      },
      userMessageText: {
        color: '#FFFFFF',
        fontSize: 16,
      },
      botMessageText: {
        color: '#000000',
        fontSize: 16,
      },
      inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
      },
      textInput: {
        flex: 1,
        height: 40,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#C1C1C1',
        paddingHorizontal: 20,
        fontSize: 16,
        marginRight: 10,
        backgroundColor: 'white'
      },
    });