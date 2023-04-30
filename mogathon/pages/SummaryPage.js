import { StatusBar } from 'expo-status-bar';
import React, { useRef, useState, useEffect } from 'react';
import
    {
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
import Constants from 'expo-constants';

// Send text to GPT and receives summary
const SummaryPage = ({ route, navigation }) =>
{
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const scrollViewRef = useRef();
    const lang = route.params.lang;
    const summ = route.params?.summary;
    const imgText = route.params?.fullTextString;

    const handleContentSizeChange = () =>
    {
        scrollViewRef.current.scrollToEnd({ animated: true });
    };

    useEffect(() =>
    {
        if (summ)
        {
            setMessages([{ text: summ, sender: 'bot' }]);
        }
    }, [summ]);

    // Handles sending of messages from user to GPT
    const handleSend = async () =>
    {
        if (newMessage.trim() !== '')
        {
            let n = newMessage;
            let newList = messages;
            newList.push({ text: n, sender: 'user' });
            setMessages(newList);
            setNewMessage('');
            let response = await GPTPrompt(n);
            newList.push({ text: response, sender: 'bot' });
            setMessages(newList);
            console.log(messages);
            setNewMessage(' ');
            setNewMessage('');
        }
    };

    // Renders user messages sent to GPT
    const renderMessage = (message, index) =>
    {
        const isUser = message.sender === 'user';
        const messageStyle = isUser ? styles.userMessage : styles.botMessage;
        const textStyle = isUser ? styles.userMessageText : styles.botMessageText;
        console.log("PLEASE RERENDER")
        return (
            <View key={index} style={[styles.messageContainer, { alignSelf: isUser ? 'flex-end' : 'flex-start' }]}>
                <View style={[styles.messageBubble, messageStyle]}>
                    <Text style={textStyle}>{message.text}</Text>
                </View>
            </View>
        );
    };


    // Prompts GPT to respond to user's prompt
    const GPTPrompt = async (prompt) =>
    {
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

                messages: [{ role: "system", content: "you are responding to the following summary gave:" + summ + " The summary is based on the following text:" + imgText }, { role: "user", content: prompt + ". Please respond in the " + lang + " language" },],
                temperature: 1,
                n: 1,
                stop: '\n'
            })
        });

        const data = await response.json();
        console.log(data.choices[0].message.content)
        return data.choices[0].message.content;
    }

    // Renders page containing summary and messages in addition to navigatory buttons
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

// Styling for page components
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
    scrollView: {
        width: '100%',
        height: '80%',
    },
    header: {
        flexDirection: 'row',
        height: '10%',
        width: '100%',
        justifyContent: 'flex-start',
        alignItems: 'flex-end',
        backgroundColor: 'transparent'
    },
    backBtnContainer: {
        paddingLeft: 25,
        backgroundColor: 'transparent'
    },
    backBtnImage: {
        width: 50,
        backgroundColor: 'transparent'
    },
    chatContainer: {
        flex: 1,
        paddingHorizontal: 10,
    },

    body: {
        display: 'flex',
        flexDirection: 'row',
        height: '80%',
        width: '100%',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 5,
        backgroundColor: 'black',

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
        backgroundColor: '#fffcd1',
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