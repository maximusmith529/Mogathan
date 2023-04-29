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
// SummaryPage.js

const SummaryPage = ({route, navigation, initialPrompt }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  const handleSend = () => {
    if (newMessage.trim() !== '') {
      setMessages([...messages, { text: newMessage, sender: 'user' }]);
      setNewMessage('');
    }
  };

  return (
   
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={{ fontWeight: 'bold' }}>Chat with Support</Text>
        </View>
        <View style={styles.body}>
          <Text style={{ fontStyle: 'italic' }}>{initialPrompt}</Text>
        </View>
        <View style={{ flex: 1, padding: 10 }}>
          {messages.map((message, index) => (
            <View
              key={index}
              style={{
                alignSelf: message.sender === 'user' ? 'flex-end' : 'flex-start',
                backgroundColor: message.sender === 'user' ? '#2196f3' : '#f5f5f5',
                padding: 10,
                borderRadius: 5,
                marginBottom: 10,
              }}
            >
              <Text style={{ color: message.sender === 'user' ? '#fff' : '#000' }}>{message.text}</Text>
            </View>
          ))}
        </View>
        <View style={{ flexDirection: 'row', padding: 10 }}>
          <TextInput
            style={{ flex: 1, marginRight: 10, borderRadius: 5, borderWidth: 1, borderColor: '#ccc', padding: 10 }}
            placeholder="Type a message"
            value={newMessage}
            onChangeText={(text) => setNewMessage(text)}
          />
          <TouchableOpacity
            style={{ backgroundColor: '#2196f3', padding: 10, borderRadius: 5 }}
            onPress={handleSend}
          >
            <Text style={{ color: '#fff', fontWeight: 'bold' }}>Send</Text>
          </TouchableOpacity>
        </View>
      </View>
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